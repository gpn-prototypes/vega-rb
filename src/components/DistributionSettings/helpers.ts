import {
  DistributionDefinitionTypes,
  DistributionParameterInput,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';
import { toPairs } from 'lodash';
import { DistributionError } from 'services/types';

import { percentileFieldRankTypes, percentileFieldTypes } from './constants';
import distributionParametersMap from './data';
import {
  DefaultField,
  DistributionPairsCallback,
  DistributionParameterPercentileRank,
  DistributionSettingsParameters,
  Error,
  PercentileField,
} from './types';

export const isNumeric = (num?: string | number): boolean =>
  (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) &&
  !Number.isNaN(parseFloat(num as string));

export const validateDistributionParams = (
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
  callback: DistributionPairsCallback,
): DistributionParameterInput[] => {
  return toPairs<NonNullable<DistributionParameterTypes | string>>(
    parameters,
  ).map(callback);
};

export const getErrorMessage = (
  errorList: DistributionError[],
  codeField?: string,
): DistributionError | Error =>
  errorList.find((error) => {
    let result;
    const hasCodeField = codeField !== undefined && codeField.trim().length;

    if (error.__typename === 'DistributionDefinitionError' && hasCodeField) {
      result = error.fields.includes(codeField!);
    } else if (error.__typename === 'CommonError' && !hasCodeField) {
      result = error;
    }

    return result;
  }) || { message: undefined };
