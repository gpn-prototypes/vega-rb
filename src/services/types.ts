import {
  CommonError,
  DistributionChart,
  DistributionDefinitionError,
} from 'generated/graphql';

export interface DistributionResponse {
  distributionChart?: DistributionChart;
  errors?: DistributionDefinitionError[];
}

export type DistributionError = DistributionDefinitionError | CommonError;
