import { TextField } from '@gpn-prototypes/vega-ui';
import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';

const textFieldFormPropertyName = 'form';

type TextFieldProps = React.ComponentProps<typeof TextField>;

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

export type Field = DefaultField | QuantilesField;

export type DefaultField = {
  key: Exclude<
    DistributionParameterTypes,
    | DistributionParameterTypes.Q1Value
    | DistributionParameterTypes.Q2Value
    | DistributionParameterTypes.Q1Rank
    | DistributionParameterTypes.Q2Rank
  >;
  defaultValue: string;
  title: string;
};

export type QuantilesField = {
  key: DistributionParameterTypes.Q1Value | DistributionParameterTypes.Q2Value;
  rankKey:
    | DistributionParameterTypes.Q1Rank
    | DistributionParameterTypes.Q2Rank;
  title: (rank: string) => string;
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
