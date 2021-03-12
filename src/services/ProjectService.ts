import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { FetchPolicy } from '@apollo/client/core/watchQueryOptions';
import { GET_RECENTLY_EDITED } from 'components/CompetitiveAccess/queries';
import { GET_DISTRIBUTION_VALUE } from 'components/DistributionSettings/queries';
import { GridCollection } from 'components/ExcelTable/types';
import {
  CalculatedOrError,
  DistributionDefinitionError,
  DistributionInput,
  DistributionParameter,
  Mutation,
  ProjectStructure,
  ProjectStructureInput,
  Query,
  RbProject,
} from 'generated/graphql';
import { getOr } from 'lodash/fp';
import { Just, None } from 'monet';
import {
  GET_PROJECT_NAME,
  GET_TABLE_TEMPLATE,
  LOAD_PROJECT,
  SAVE_PROJECT,
} from 'pages/Scheme/components/Table/queries';
import { CALCULATION_PROJECT } from 'pages/Scheme/mutations';
import { DistributionResponse } from 'services/types';
import {
  getDownloadResultUri,
  getGraphqlUri,
  getMockConceptions,
} from 'services/utils';
import { Identity, Project } from 'types';
import { packTableData } from 'utils';

type ProjectServiceProps = {
  client: ApolloClient<NormalizedCacheObject>;
  project: Project;
  identity?: Identity;
};

class ProjectService {
  #client: ApolloClient<NormalizedCacheObject> | undefined;

  #fetchPolicy: FetchPolicy = 'no-cache';

  #identity: Identity | undefined;

  #projectId = '';

  #version = 0;

  get client() {
    return this.#client as ApolloClient<NormalizedCacheObject>;
  }

  get identity() {
    return this.#identity as Identity;
  }

  get projectId(): string {
    return this.#projectId;
  }

  get version(): number {
    return this.#version;
  }

  static getDistributionValue({
    distributionChart,
  }: DistributionResponse): number | null {
    return Just(
      distributionChart?.visiblePercentile.point.x as number,
    ).orNull();
  }

  init({ client, project, identity }: ProjectServiceProps): ProjectService {
    this.#client = client;
    this.#projectId = project.vid;
    this.#version = project.version;
    this.#identity = identity;

    return this;
  }

  saveProject(
    table: GridCollection,
    structure: ProjectStructureInput,
    version: string,
  ) {
    return this.client.mutate({
      mutation: SAVE_PROJECT,
      context: {
        uri: getGraphqlUri(this.projectId),
      },
      variables: {
        projectInput: getMockConceptions({
          name: 'conception_1',
          description: '',
          probability: 1,
          structure: packTableData(table, structure),
        }),
        version,
      },
    });
  }

  getTableTemplate(): Promise<ProjectStructure> {
    return this.client
      .query<Query>({
        query: GET_TABLE_TEMPLATE,
        variables: {
          vid: this.projectId,
        },
        context: {
          uri: getGraphqlUri(this.projectId),
        },
        fetchPolicy: this.#fetchPolicy,
      })
      .then<ProjectStructure>(({ data }) =>
        getOr(
          None<ProjectStructure>(),
          [
            'resourceBase',
            'project',
            'template',
            'conceptions',
            0,
            'structure',
          ],
          data,
        ),
      );
  }

  async getCalculationArchive(
    fileId: string,
  ): Promise<{ filename: string; data: Blob }> {
    const token = await this.identity.getToken();
    const serverResponse = await fetch(getDownloadResultUri(fileId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const filename = serverResponse.headers
      .get('Content-Disposition')
      ?.match('filename="(?<filename>.*)"')?.groups?.filename;

    return {
      filename: filename || 'result.zip',
      data: await serverResponse.blob(),
    };
  }

  getCalculationResultFileId(
    tableData: GridCollection,
    conceptionStructure: ProjectStructureInput,
  ) {
    return this.client
      .mutate<Mutation>({
        mutation: CALCULATION_PROJECT,
        context: {
          uri: getGraphqlUri(this.projectId),
        },
        fetchPolicy: 'no-cache',
        variables: {
          projectInput: getMockConceptions({
            name: 'conception_1',
            description: 'описание',
            probability: 1,
            structure: packTableData(tableData, conceptionStructure),
          }),
        },
      })
      .then(({ data }) =>
        getOr(
          None<CalculatedOrError>(),
          ['resourceBase', 'calculateProject'],
          data,
        ),
      );
  }

  getProjectName() {
    return this.client
      .query({
        query: GET_PROJECT_NAME,
        variables: {
          vid: this.#projectId,
        },
        fetchPolicy: 'no-cache',
      })
      .then(({ data }) => data.project.name);
  }

  getProjectRecentlyEdited() {
    return this.client
      .query({
        query: GET_RECENTLY_EDITED,
        variables: {
          vid: this.projectId,
        },
        fetchPolicy: 'no-cache',
      })
      .then(({ data }) => data.project.recentlyEdited);
  }

  getResourceBaseData(): Promise<RbProject> {
    return this.client
      .query<Query>({
        query: LOAD_PROJECT,
        context: {
          uri: getGraphqlUri(this.projectId),
        },
        fetchPolicy: this.#fetchPolicy,
      })
      .then(({ data }) => {
        return getOr(
          None<RbProject>(),
          ['resourceBase', 'project', 'loadFromDatabase'],
          data,
        );
      });
  }

  getDistribution({
    type,
    definition,
    parameters,
    minBound,
    maxBound,
  }: DistributionInput): Promise<DistributionResponse> {
    return this.client
      .query({
        query: GET_DISTRIBUTION_VALUE,
        context: {
          uri: getGraphqlUri(this.projectId),
        },
        fetchPolicy: this.#fetchPolicy,
        variables: {
          distribution: {
            parameters: (parameters as DistributionParameter[]).map(
              ({ __typename, ...parameter }) => parameter,
            ),
            type,
            definition,
            minBound,
            maxBound,
          },
        },
      })
      .then(({ data }) => {
        const distributionChart =
          data?.resourceBase.distribution?.distributionChart;
        const errors = distributionChart?.errors;

        return {
          distributionChart,
          errors,
        };
      })
      .catch((error) => {
        return {
          errors: [error.message] as DistributionDefinitionError[],
        };
      });
  }
}

const projectService = new ProjectService();

export default projectService;
