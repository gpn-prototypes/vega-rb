import {
  DistributionChart,
  DistributionDefinitionError,
} from 'generated/graphql';

export interface DistributionResponse {
  distributionChart?: DistributionChart;
  errors?: DistributionDefinitionError[];
}
