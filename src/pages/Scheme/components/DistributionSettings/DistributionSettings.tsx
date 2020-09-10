import React, { ReactText, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { SelectedCell } from 'components/ExcelTable/types';
import {
  DistributionDefinitionError,
  DistributionDefinitionErrors,
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
  DistributionValue,
  Query,
} from 'generated/graphql';
import isEmpty from 'lodash/isEmpty';
import tableDuck from 'store/tableDuck';

import DistributionChart from '../DistributionChart';
import DistributionSettingsForm, {
  distributionParametersMap,
} from '../DistributionSettingsForm/DistributionSettingsForm';
import {
  DistributionSettingsFormData,
  DistributionSettingsParameters,
} from '../DistributionSettingsForm/types';

import { GET_DISTRIBUTION_VALUE } from './queries';

interface DistributionSettingsProps {
  selectedCell: SelectedCell;
}
const defaultDistributionChartValue: DistributionValue = {
  sf: [],
  pdf: [],
  percentiles: [],
};

const DistributionSettings: React.FC<DistributionSettingsProps> = ({
  selectedCell,
}) => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const checkDistributionValidation = (
    type: DistributionTypes,
    definition: DistributionDefinitionTypes,
    parameters: Partial<DistributionSettingsParameters>,
  ) =>
    parameters &&
    !!distributionParametersMap[type].fieldsByType[definition]?.every(
      ({ key }) => !Number.isNaN(parameters[key]) && !isEmpty(parameters[key]),
    );
  const getFormDataFromTableCell = useCallback(
    (
      cell: SelectedCell,
    ): DistributionSettingsFormData & { isValid?: boolean } => {
      const { row, column } = cell;
      if (row[column.key]?.args?.type) {
        const defaultParameters = row[column.key]?.args?.parameters.reduce(
          (prev, { type: t, value }) => ({ ...prev, [t]: value }),
          {},
        ) as Partial<DistributionSettingsParameters>;

        const distributionType =
          row[column.key]?.args?.type || DistributionTypes.Normal;
        const distributionDefinitionType =
          row[column.key]?.args?.definition ||
          DistributionDefinitionTypes.MeanSd;
        const parameters = {
          ...(distributionParametersMap[DistributionTypes.Normal].fieldsByType[
            DistributionDefinitionTypes.MeanSd
          ]?.reduce(
            (prev, { key, defaultValue }) => ({ ...prev, [key]: defaultValue }),
            {},
          ) as Partial<DistributionSettingsParameters>),
          ...defaultParameters,
        };
        const isValid = checkDistributionValidation(
          distributionType,
          distributionDefinitionType,
          parameters,
        );
        return {
          distributionType,
          distributionDefinitionType,
          parameters,
          isValid,
        };
      }
      return {
        distributionType: DistributionTypes.Normal,
        distributionDefinitionType: DistributionDefinitionTypes.MeanSd,
        parameters: distributionParametersMap[
          DistributionTypes.Normal
        ].fieldsByType[DistributionDefinitionTypes.MeanSd]?.reduce(
          (prev, { key, defaultValue }) => ({ ...prev, [key]: defaultValue }),
          {},
        ) as Partial<DistributionSettingsParameters>,
        isValid: false,
      };
    },
    [],
  );
  const [formData, setFormData] = useState(
    getFormDataFromTableCell(selectedCell),
  );
  const [errors, setErrors] = useState<DistributionDefinitionError[]>([]);
  const [chartData, setChartData] = useState(defaultDistributionChartValue);
  const updateTable = useCallback(
    (
      value: ReactText,
      {
        parameters,
        distributionType,
        distributionDefinitionType,
      }: DistributionSettingsFormData,
      cell,
    ) => {
      dispatch(
        tableDuck.actions.updateCell({
          selectedCell: cell,
          cellData: {
            args: {
              parameters: (Object.keys(
                parameters,
              ) as DistributionParameterTypes[]).map((type) => ({
                type,
                value: parameters[type] as string,
              })),
              type: distributionType,
              definition: distributionDefinitionType,
            },
            value,
          },
        }),
      );
    },
    [dispatch],
  );
  const getChart = useCallback(
    ({
      parameters,
      distributionType,
      distributionDefinitionType,
    }: DistributionSettingsFormData) =>
      client.query<Query>({
        query: GET_DISTRIBUTION_VALUE,
        variables: {
          distribution: {
            parameters: Object.entries(parameters).map(
              ([parameterType, value]) => ({
                type: parameterType,
                value: Number.parseFloat(value as string),
              }),
            ),
            type: distributionType,
            definition: distributionDefinitionType,
          },
        },
      }),
    [client],
  );
  const handleChange = ({
    distributionType,
    distributionDefinitionType,
    parameters,
  }: DistributionSettingsFormData) => {
    setFormData({
      parameters,
      distributionDefinitionType,
      distributionType,
    });
    if (
      checkDistributionValidation(
        distributionType,
        distributionDefinitionType,
        parameters,
      )
    ) {
      getChart({
        parameters,
        distributionDefinitionType,
        distributionType,
      }).then((res) => {
        if (
          (res?.data?.distribution
            ?.distributionValue as DistributionDefinitionErrors)?.errors
        ) {
          setErrors(
            (res?.data?.distribution
              ?.distributionValue as DistributionDefinitionErrors)?.errors,
          );
          setChartData(defaultDistributionChartValue);
          updateTable(
            '',
            {
              parameters,
              distributionDefinitionType,
              distributionType,
            },
            selectedCell,
          );
        } else if (res?.data?.distribution?.distributionValue) {
          setChartData(
            res.data.distribution.distributionValue as DistributionValue,
          );
          setErrors([]);
          updateTable(
            (res.data.distribution.distributionValue as DistributionValue)
              .percentiles?.[0].point.x,
            {
              parameters,
              distributionDefinitionType,
              distributionType,
            },
            selectedCell,
          );
        }
      });
    } else {
      setErrors([]);
      setChartData(defaultDistributionChartValue);
      updateTable(
        '',
        {
          parameters,
          distributionDefinitionType,
          distributionType,
        },
        selectedCell,
      );
    }
  };

  useEffect(() => {
    const {
      parameters,
      distributionDefinitionType,
      distributionType,
      isValid,
    } = getFormDataFromTableCell(selectedCell);
    setFormData({
      parameters,
      distributionDefinitionType,
      distributionType,
    });
    if (isValid) {
      getChart({
        parameters,
        distributionDefinitionType,
        distributionType,
      }).then((res) => {
        if (res?.data?.distribution?.distributionValue) {
          setChartData(
            res.data.distribution.distributionValue as DistributionValue,
          );
          setErrors([]);
        }
      });
    } else {
      setChartData(defaultDistributionChartValue);
      setErrors([]);
    }
  }, [getChart, getFormDataFromTableCell, selectedCell]);

  return (
    <>
      <DistributionSettingsForm
        onChange={handleChange}
        formData={formData}
        errors={errors}
      />
      <DistributionChart data={chartData} />
    </>
  );
};

export default DistributionSettings;
