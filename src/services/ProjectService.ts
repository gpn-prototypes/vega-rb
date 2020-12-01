import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GridCollection } from 'components/ExcelTable/types';
import {
  Distribution,
  DistributionDefinitionError,
  DistributionDefinitionErrors,
  DistributionParameter,
  Percentile,
  ProjectStructure,
  ProjectStructureInput,
  Query,
} from 'generated/graphql';
import { GET_DISTRIBUTION_VALUE } from 'pages/Scheme/components/DistributionSettings/queries';
import {
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
import { TableState } from 'store/types';
import { Identity } from 'types';
import { packTableData } from 'utils';

type ProjectServiceProps = {
  client: ApolloClient<NormalizedCacheObject>;
  projectId: string;
  identity?: Identity;
};

class ProjectService {
  private _client: ApolloClient<NormalizedCacheObject> | undefined;

  private _projectId = '';

  private _identity: Identity | undefined;

  static getDistributionValue({
    distributionChart,
  }: DistributionResponse): number | null {
    if (distributionChart) {
      return distributionChart.percentiles?.find(
        (percentile: Percentile) => percentile.rank === 50,
      )?.point.x as number;
    }
    return null;
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
        fetchPolicy: 'no-cache',
      })
      .then(
        ({ data }) =>
          data.resourceBase?.project?.template?.conceptions[0].structure ||
          ({} as ProjectStructure),
      );
  }

  getCalculationArchive(fileId: string) {
    return fetch(getDownloadResultUri(fileId), {
      headers: {
        Authorization: `Bearer ${this.identity.getToken()}`,
      },
    }).then((resp) => resp.blob());
  }

  getCalculationResultFileId(
    tableData: TableState,
    conceptionStructure: ProjectStructureInput,
  ) {
    return this.client
      .mutate({
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
      .then(({ data }) => data.resourceBase.calculateProject);
  }

  getProjectVersion() {
    return this.client
      .query({
        query: GET_VERSION,
        variables: {
          vid: this.projectId,
        },
        fetchPolicy: 'no-cache',
      })
      .then(({ data }) => data.project.version);
  }

  getResourceBaseData() {
    return this.client
      .query({
        query: LOAD_PROJECT,
        context: {
          uri: getGraphqlUri(this.projectId),
        },
        fetchPolicy: 'no-cache',
      })
      .then(({ data }) => data.resourceBase.project.loadFromDatabase);
  }

  getDistribution({
    type,
    definition,
    parameters,
  }: Distribution): Promise<DistributionResponse> {
    return this.client
      .query({
        query: GET_DISTRIBUTION_VALUE,
        context: {
          uri: getGraphqlUri(this.projectId),
        },
        fetchPolicy: 'no-cache',
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
      .then((response) => {
        const distributionChart =
          response?.data?.resourceBase.distribution?.distributionChart;
        const errors = (distributionChart as DistributionDefinitionErrors)
          ?.errors;
        return {
          errors,
          distributionChart,
        };
      })
      .catch(({ message }) => ({
        errors: [message] as DistributionDefinitionError[],
      }));
  }

  getDistributionValues(structure: ProjectStructure) {
    return Promise.all(
      structure.domainObjects.map(({ attributeValues }) =>
        Promise.all(
          structure.attributes
            .map((_, colIdx) => attributeValues[colIdx])
            .map((distributionAttributes) => {
              if (distributionAttributes) {
                return this.getDistribution(distributionAttributes).then(
                  ProjectService.getDistributionValue,
                );
              }
              return distributionAttributes;
            }),
        ),
      ),
    );
  }

  get client() {
    return this._client as ApolloClient<NormalizedCacheObject>;
  }

  get projectId() {
    return this._projectId;
  }

  get identity() {
    return this._identity as Identity;
  }
}

const projectService = new ProjectService();

export default projectService;
