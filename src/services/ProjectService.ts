import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client';
import { FetchPolicy } from '@apollo/client/core/watchQueryOptions';
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
  Query as LegacyQuery,
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

// TODO: заменить на тип из схемы
type ProjectInner = LegacyQuery & {
  vid: string;
  version: number;
};

// TODO: удалить после обновлении схемы на фронте
type Query = {
  project: ProjectInner;
};

type Data = FetchResult['data'];
class ProjectService {
  private _client: ApolloClient<NormalizedCacheObject> | undefined;

  private _fetchPolicy: FetchPolicy = 'no-cache';

  private _identity: Identity | undefined;

  private _projectId = '';

  private _version = 1;

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
      distributionChart?.visiblePercentile.point.x as number,
    ).orNull();
  }

  init({ client, projectId, identity }: ProjectServiceProps) {
    this._client = client;
    this._projectId = projectId;
    this._identity = identity;
  }

  setVersion(version: number): void {
    this._version = version;
  }

  private static warnAboutMissingFields(project: Partial<ProjectInner>): void {
    if (typeof project.version !== 'number') {
      // eslint-disable-next-line no-console
      console.warn('Missing project version');
    }

    if (typeof project.vid !== 'string') {
      // eslint-disable-next-line no-console
      console.warn('Missing project vid');
    }
  }

  static isProject(data: Data): data is Partial<ProjectInner> {
    return data?.__typename === 'ProjectInner';
  }

  private tryUpdateProjectVersion(data: Query) {
    if (ProjectService.isProject(data.project)) {
      ProjectService.warnAboutMissingFields(data.project);

      if (typeof data.project.version === 'number') {
        this.setVersion(data.project.version);
      }
    }
  }

  saveProject(table: GridCollection, structure: ProjectStructureInput) {
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
        version: this._version,
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
            'project',
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
          ['project', 'resourceBase', 'calculateProject'],
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
        this.tryUpdateProjectVersion(data);

        return getOr(
          None<RbProject>(),
          ['project', 'resourceBase', 'project', 'loadFromDatabase'],
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
