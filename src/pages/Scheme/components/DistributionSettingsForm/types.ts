import { TextFieldProps } from '@gpn-prototypes/vega-text-field/dist/src/TextField';
import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';

const textFieldFormPropertyName = 'form';

export type TextFieldFormProperty = TextFieldProps[typeof textFieldFormPropertyName];

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
