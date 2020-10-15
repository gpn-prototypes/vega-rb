import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';
import { isEmpty, toPairs } from 'lodash';
import distributionParametersMap from 'pages/Scheme/components/DistributionSettingsForm/data';
import {
  DistributionParameterPercentileRank,
  DistributionSettingsParameters,
  PercentileField,
} from 'pages/Scheme/components/DistributionSettingsForm/types';

export const percentileFieldRankTypes = [
  DistributionParameterTypes.P1Rank,
  DistributionParameterTypes.P2Rank,
  DistributionParameterTypes.P3Rank,
  DistributionParameterTypes.P4Rank,
];
export const percentileFieldTypes = [
  ...percentileFieldRankTypes,
  DistributionParameterTypes.P1Value,
  DistributionParameterTypes.P2Value,
  DistributionParameterTypes.P3Value,
  DistributionParameterTypes.P4Value,
];

export const checkDistributionValidation = (
  parameters: Partial<DistributionSettingsParameters>,
): boolean => {
  const checkEmpty = (parameter?: string) =>
    !Number.isNaN(parameter) && !isEmpty(parameter);
  return (Object.keys(
    parameters,
  ) as DistributionParameterTypes[]).every((key) =>
    checkEmpty(parameters[key]),
  );
};

export const getDistributionFormDataParams = (
  distributionType = DistributionTypes.Normal,
  distributionDefinitionType = DistributionDefinitionTypes.MeanSd,
) => ({
  ...(distributionParametersMap[distributionType].fieldsByType[
    distributionDefinitionType
  ]?.reduce((prev, field) => {
    if (percentileFieldTypes.includes(field.key)) {
      const {
        key,
        defaultValue,
        defaultRankValue,
        rankKey,
      } = field as PercentileField;
      return { ...prev, [key]: defaultValue, [rankKey]: defaultRankValue };
    }
    const { key, defaultValue } = field;
    return { ...prev, [key]: defaultValue };
  }, {}) as Partial<DistributionSettingsParameters>),
});

export function prepareDistributionParams([
  parameterType,
  parameterValue = '',
]: Array<DistributionParameterTypes | string>) {
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
) =>
  toPairs<NonNullable<DistributionParameterTypes | string>>(parameters).map(
    callback,
  );
