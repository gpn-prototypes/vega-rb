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
