import {
  percentileFieldRankTypes,
  percentileFieldTypes,
} from 'components/DistributionSettings/constants';
import distributionParametersMap from 'components/DistributionSettings/data';
import {
  DefaultField,
  DistributionParameterPercentileRank,
  DistributionSettingsParameters,
  PercentileField,
} from 'components/DistributionSettings/types';
import {
  DistributionDefinitionTypes,
  DistributionParameterInput,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';
import { toPairs } from 'lodash';

export const isNumeric = (num?: string | number): boolean =>
  (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) &&
  !Number.isNaN(parseFloat(num as string));

export const checkDistributionParametersIsValid = (
  parameters: Partial<DistributionSettingsParameters>,
): boolean => {
  return (Object.keys(
    parameters,
  ) as DistributionParameterTypes[]).every((key) => isNumeric(parameters[key]));
};

const getPercentileParam = (field: PercentileField) => {
  const { key, defaultValue, defaultRankValue, rankKey } = field;
  return {
    [key]: defaultValue,
    [rankKey]: defaultRankValue,
  };
};

const getParam = (field: DefaultField) => {
  const { key, defaultValue } = field;
  return { [key]: defaultValue };
};

export const getDistributionFormDataParams = (
  distributionType = DistributionTypes.Normal,
  distributionDefinitionType = DistributionDefinitionTypes.MeanSd,
): Partial<DistributionSettingsParameters> => ({
  ...(distributionParametersMap[distributionType].fieldsByType[
    distributionDefinitionType
  ]?.reduce((prev, field) => {
    const param = percentileFieldTypes.includes(field.key)
      ? getPercentileParam(field as PercentileField)
      : getParam(field as DefaultField);
    return {
      ...prev,
      ...param,
    };
  }, {}) as Partial<DistributionSettingsParameters>),
});

export function prepareDistributionParams([
  parameterType,
  parameterValue = '',
]: Array<DistributionParameterTypes | string>): DistributionParameterInput {
  if (
    percentileFieldRankTypes.includes(
      parameterType as DistributionParameterTypes,
    )
  ) {
    return {
      type: parameterType as DistributionParameterPercentileRank,
      value: Number.parseFloat(parameterValue) / 100,
    };
  }
  return {
    type: parameterType as Exclude<
      DistributionParameterTypes,
      DistributionParameterPercentileRank
    >,
    value: Number.parseFloat(parameterValue),
  };
}

export const mapEntries = (
  parameters: Partial<DistributionSettingsParameters>,
  callback: (
    value: Array<DistributionParameterTypes | string>,
  ) => { type: DistributionParameterTypes; value: number },
): DistributionParameterInput[] =>
  toPairs<NonNullable<DistributionParameterTypes | string>>(parameters).map(
    callback,
  );
