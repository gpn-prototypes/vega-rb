import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { FetchPolicy } from '@apollo/client/core/watchQueryOptions';
import { GET_DISTRIBUTION_VALUE } from 'components/DistributionSettings/queries';
import { GridCollection } from 'components/ExcelTable/types';
import {
  CalculatedOrError,
  DistributionDefinitionError,
  DistributionInput,
  DistributionParameter,
  Mutation,
  Percentile,
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
  GET_VERSION,
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
import { Identity } from 'types';
import { packTableData } from 'utils';

import { GET_RECENTLY_EDITED } from '../components/CompetitiveAccess/queries';

type ProjectServiceProps = {
  client: ApolloClient<NormalizedCacheObject>;
  projectId: string;
  identity?: Identity;
};

class ProjectService {
  private _client: ApolloClient<NormalizedCacheObject> | undefined;

  private _fetchPolicy: FetchPolicy = 'no-cache';

  private _identity: Identity | undefined;

  private _projectId = '';

  get client() {
    return this._client as ApolloClient<NormalizedCacheObject>;
  }

  get identity() {
    return this._identity as Identity;
  }

  get projectId() {
    return this._projectId;
  }

  static getDistributionValue({
    distributionChart,
  }: DistributionResponse): number | null {
    return Just(
      distributionChart?.percentiles?.find(
        (percentile: Percentile) => percentile.rank === 50,
      )?.point.x as number,
    ).orNull();
  }

  init({ client, projectId, identity }: ProjectServiceProps) {
    this._client = client;
    this._projectId = projectId;
    this._identity = identity;
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
          probability: 0.6,
          structure: packTableData(table, structure),
        }),
        version,
      },
    });
  }

  getTableTemplate() {
    return this.client
      .query<Query>({
        query: GET_TABLE_TEMPLATE,
        variables: {
          vid: this.projectId,
        },
        context: {
          uri: getGraphqlUri(this.projectId),
        },
        fetchPolicy: this._fetchPolicy,
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

  getCalculationArchive(fileId: string) {
    return this.identity.getToken().then((token) =>
      fetch(getDownloadResultUri(fileId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.blob()),
    );
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
          vid: this.projectId,
        },
        fetchPolicy: 'no-cache',
      })
      .then(({ data }) => data.project.name);
  }

  getProjectVersion() {
    return this.client
      .query({
        query: GET_VERSION,
        variables: {
          vid: this.projectId,
        },
        fetchPolicy: this._fetchPolicy,
      })
      .then(({ data }) => data.project.version);
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

  getResourceBaseData() {
    return this.client
      .query<Query>({
        query: LOAD_PROJECT,
        context: {
          uri: getGraphqlUri(this.projectId),
        },
        fetchPolicy: this._fetchPolicy,
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
  }: DistributionInput): Promise<DistributionResponse> {
    return this.client
      .query({
        query: GET_DISTRIBUTION_VALUE,
        context: {
          uri: getGraphqlUri(this.projectId),
        },
        fetchPolicy: this._fetchPolicy,
        variables: {
          distribution: {
            parameters: (parameters as DistributionParameter[]).map(
              ({ __typename, ...parameter }) => parameter,
            ),
            type,
            definition,
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
