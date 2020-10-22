import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';

export type DistributionParametersMap = {
  [key in DistributionTypes]: DistributionParameters;
};

interface DistributionType {
  type: DistributionDefinitionTypes;
  title: string;
}

export type DistributionParameters = {
  fieldsByType: Partial<{ [key in DistributionDefinitionTypes]: Field[] }>;
  types: DistributionType[];
};

export type Field = DefaultField | PercentileField;
export type DistributionParameterPercentileValue =
  | DistributionParameterTypes.Q1Value
  | DistributionParameterTypes.Q2Value
  | DistributionParameterTypes.Q3Value
  | DistributionParameterTypes.Q4Value;
export type DistributionParameterPercentileRank =
  | DistributionParameterTypes.Q1Rank
  | DistributionParameterTypes.Q2Rank
  | DistributionParameterTypes.Q3Rank
  | DistributionParameterTypes.Q4Rank;
export type DistributionParameterPercentileTypes =
  | DistributionParameterPercentileValue
  | DistributionParameterPercentileRank;

export type DefaultField = {
  key: Exclude<
    DistributionParameterTypes,
    DistributionParameterPercentileTypes
  >;
  defaultValue: string;
  title: string;
};

export type PercentileField = {
  key: DistributionParameterPercentileValue;
  rankKey: DistributionParameterPercentileRank;
  defaultRankValue: string;
  defaultValue: string;
};

export type DistributionSettingsParameters = {
  [key in DistributionParameterTypes]: string;
};

export type DistributionSettingsFormData = {
  distributionType: DistributionTypes;
  distributionDefinitionType: DistributionDefinitionTypes;
  parameters: Partial<DistributionSettingsParameters>;
};
