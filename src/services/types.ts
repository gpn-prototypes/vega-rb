import { DistributionChartData } from 'components/DistributionSettings/types';
import { CommonError, DistributionDefinitionError } from 'generated/graphql';

export interface DistributionResponse {
  distributionChart?: DistributionChartData;
  errors?: DistributionDefinitionError[];
}

export type DistributionError = DistributionDefinitionError | CommonError;
