import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from '../../../../generated/graphql';

export type DistributionParametersMap = {
  [key in DistributionTypes]: DistributionParameters;
};

export type DistributionParameters = {
  fieldsByType: Partial<{ [key in DistributionDefinitionTypes]: Field[] }>;
  types: {
    type: DistributionDefinitionTypes;
    title: string;
  }[];
};

export type Field = {
  key: DistributionParameterTypes;
  defaultValue: string;
  title: string;
};

export type DistributionSettingsParameters = {
  [key in DistributionParameterTypes]: string;
};

export type DistributionSettingsFormData = {
  distributionType: DistributionTypes;
  distributionDefinitionType: DistributionDefinitionTypes;
  parameters: Partial<DistributionSettingsParameters>;
};
