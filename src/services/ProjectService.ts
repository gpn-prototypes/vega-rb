import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client';
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
  ProjectInner,
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
import { packTableData, unpackTableData } from 'utils';

type ProjectServiceProps = {
  client: ApolloClient<NormalizedCacheObject>;
  projectId: string;
  identity?: Identity;
};

type Data = FetchResult['data'];

type Project = ProjectInner & {
  vid: string;
  version: number;
};

const getProjectStructure = (
  project: Partial<ProjectInner>,
): ProjectStructure | undefined => {
  return project.resourceBase?.project?.loadFromDatabase?.conceptions?.[0]
    .structure;
};

const repackTableData = (
  project: Project,
  input?: ProjectStructureInput,
): ProjectStructureInput => {
  const structure = getProjectStructure(project);

  if (structure === undefined) {
    throw new Error('Cannot repack table data without project structure');
  }

  const data = unpackTableData(structure, project.version);

  return packTableData(data, input ?? structure);
};

function throwError(message: string): never {
  throw new Error(`[RB/ProjectService]: ${message}`);
}

class ProjectService {
  private _client: ApolloClient<NormalizedCacheObject> | undefined;

  private _fetchPolicy: FetchPolicy = 'no-cache';

  private _identity: Identity | undefined;

  private _projectId = '';

  private _project: null | Project = null;

  private diffErrorTypename = 'UpdateProjectInnerDiff';

  get client() {
    return this._client as ApolloClient<NormalizedCacheObject>;
  }

  get identity() {
    return this._identity as Identity;
  }

  get projectId() {
    return this._projectId;
  }

  get version() {
    return this.project.version;
  }

  get project() {
    if (this._project === null) {
      throwError('Working project version is not setup');
    }

    return this._project;
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

  private static assertRequiredFields(
    project: Partial<ProjectInner>,
  ): asserts project is Project {
    if (typeof project.version !== 'number') {
      throwError('Missing project version');
    }

    if (typeof project.vid !== 'string') {
      throwError('Missing project vid');
    }
  }

  static isProject(data: Data): data is Partial<ProjectInner> {
    return data?.__typename === 'ProjectInner';
  }

  private trySetupWorkingProject(data: Query) {
    if (ProjectService.isProject(data.project)) {
      ProjectService.assertRequiredFields(data.project);
      this._project = data.project;
    } else {
      throwError('"project" is not found in query');
    }
  }

  private getDiffResolvingConfig() {
    return {
      maxAttempts: 20,
      errorTypename: this.diffErrorTypename,
      mergeStrategy: {
        default: 'replace',
      },
      projectAccessor: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fromDiffError: (data: Record<string, any>) => ({
          remote: {
            version: data.remoteProject.version,
            projectInput: getMockConceptions({
              name: 'conception_1',
              description: '',
              probability: 1,
              structure: repackTableData(data.remoteProject),
            }),
          },
          local: {
            version: this.project.version,
            projectInput: getMockConceptions({
              name: 'conception_1',
              description: '',
              probability: 1,
              structure: repackTableData(this.project),
            }),
          },
        }),
      },
    };
  }

  async getStructure(): Promise<ProjectStructure> {
    let structure = getProjectStructure(this.project);

    if (structure === undefined) {
      // eslint-disable-next-line no-console
      console.info(
        'Local version of project stucture not found. Trying to fetch from template...',
      );
      try {
        structure = await this.getTableTemplate();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Cannot fetch resource base structure');
        throw error;
      }
    }

    return structure;
  }

  async saveProject(table: GridCollection) {
    const structure = await this.getStructure();

    return this.client.mutate({
      mutation: SAVE_PROJECT,
      context: {
        uri: getGraphqlUri(this.projectId),
        projectDiffResolving: this.getDiffResolvingConfig(),
      },
      variables: {
        projectInput: getMockConceptions({
          name: 'conception_1',
          description: '',
          probability: 1,
          structure: packTableData(table, structure),
        }),
        version: this.project.version,
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
      .then<ProjectStructure>(({ data }) => {
        return getOr(
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
        );
      });
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

  async getCalculationResultFileId(tableData: GridCollection) {
    const structure = await this.getStructure();
    return this.client
      .mutate<Mutation>({
        mutation: CALCULATION_PROJECT,
        context: {
          uri: getGraphqlUri(this.projectId),
          projectDiffResolving: this.getDiffResolvingConfig(),
        },
        fetchPolicy: 'no-cache',
        variables: {
          version: this.project.version,
          projectInput: getMockConceptions({
            name: 'conception_1',
            description: 'описание',
            probability: 1,
            structure: packTableData(tableData, structure),
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

  getResourceBaseData(): Promise<RbProject> {
    return this.client
      .query<Query>({
        query: LOAD_PROJECT,
        context: {
          uri: getGraphqlUri(this.projectId),
        },
        fetchPolicy: this._fetchPolicy,
      })
      .then(({ data }) => {
        this.trySetupWorkingProject(data);

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
    minBound,
    maxBound,
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
            minBound,
            maxBound,
          },
        },
      })
      .then(({ data }) => {
        const distributionChart =
          data?.project.resourceBase.distribution?.distributionChart;
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
