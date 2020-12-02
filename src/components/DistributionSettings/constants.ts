import { DistributionParameterTypes } from 'generated/graphql';

export const percentileFieldRankTypes = [
  DistributionParameterTypes.Q1Rank,
  DistributionParameterTypes.Q2Rank,
  DistributionParameterTypes.Q3Rank,
  DistributionParameterTypes.Q4Rank,
];
export const percentileFieldTypes = [
  ...percentileFieldRankTypes,
  DistributionParameterTypes.Q1Value,
  DistributionParameterTypes.Q2Value,
  DistributionParameterTypes.Q3Value,
  DistributionParameterTypes.Q4Value,
];
