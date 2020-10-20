import React, { ReactText, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { SelectedCell } from 'components/ExcelTable/types';
import {
  DistributionChart as IDistributionChart,
  DistributionDefinitionError,
  DistributionDefinitionErrors,
  DistributionDefinitionTypes,
  DistributionTypes,
  ResourceBaseQueries,
} from 'generated/graphql';
import tableDuck from 'store/tableDuck';

import DistributionChart from '../DistributionChart';
import DistributionSettingsForm from '../DistributionSettingsForm';
import {
  DistributionSettingsFormData,
  DistributionSettingsParameters,
} from '../DistributionSettingsForm/types';

import {
  checkDistributionValidation,
  getDistributionFormDataParams,
  mapEntries,
  prepareDistributionParams,
} from './helpers';
import { GET_DISTRIBUTION_VALUE } from './queries';

const defaultDistributionChartValue: IDistributionChart = {
  sf: [],
  pdf: [],
  percentiles: [],
};

interface DistributionSettingsProps {
  selectedCell: SelectedCell;
}

const DistributionSettings: React.FC<DistributionSettingsProps> = ({
  selectedCell,
}) => {
  const dispatch = useDispatch();
  const client = useApolloClient();

  const getFormDataFromTableCell = useCallback(
    (
      cell: SelectedCell,
    ): DistributionSettingsFormData & { isValid: boolean } => {
      const cellProps = cell.row[cell.column.key];

      if (cellProps?.args?.type) {
        const cellArgs = cellProps.args;
        const defaultParameters = cellArgs?.parameters.reduce(
          (prev, { type: t, value }) => ({ ...prev, [t]: value }),
          {},
        ) as Partial<DistributionSettingsParameters>;

        const distributionType = cellArgs?.type || DistributionTypes.Normal;

        const distributionDefinitionType =
          cellArgs?.definition || DistributionDefinitionTypes.MeanSd;
        const parameters = getDistributionFormDataParams(
          distributionType,
          distributionDefinitionType,
        );

        const result = {
          distributionType,
          distributionDefinitionType,
          parameters: {
            ...parameters,
            ...defaultParameters,
          },
        };
        const isValid = checkDistributionValidation(result.parameters);

        return {
          ...result,
          isValid,
        };
      }

      return {
        distributionType: DistributionTypes.Normal,
        distributionDefinitionType: DistributionDefinitionTypes.MeanSd,
        parameters: getDistributionFormDataParams(
          DistributionTypes.Normal,
          DistributionDefinitionTypes.MeanSd,
        ),
        isValid: false,
      };
    },
    [],
  );
  const [formData, setFormData] = useState({
    isValid: false,
  } as DistributionSettingsFormData & { isValid?: boolean });
  const [errors, setErrors] = useState<DistributionDefinitionError[]>([]);
  const [chartData, setChartData] = useState<IDistributionChart>(
    defaultDistributionChartValue,
  );

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
              parameters: mapEntries(parameters, prepareDistributionParams),
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
      client
        .query<ResourceBaseQueries>({
          query: GET_DISTRIBUTION_VALUE,
          variables: {
            distribution: {
              parameters: mapEntries(parameters, prepareDistributionParams),
              type: distributionType,
              definition: distributionDefinitionType,
            },
          },
        })
        .then((response) => {
          const distributionChart =
            response?.data?.distribution?.distributionChart;

          return {
            distributionChart: distributionChart as IDistributionChart,
            errors: (distributionChart as DistributionDefinitionErrors)?.errors,
          };
        })
        .catch(({ message }) => {
          return { distributionChart: undefined, errors: [message] };
        }),
    [client],
  );

  const handleChange = (distributionProps: DistributionSettingsFormData) => {
    setFormData(distributionProps);
    if (checkDistributionValidation(distributionProps.parameters)) {
      getChart(distributionProps).then((data) => {
        if (data.errors) {
          setErrors(data.errors);
          setChartData(defaultDistributionChartValue);
          updateTable('', distributionProps, selectedCell);
        } else if (data.distributionChart) {
          setChartData(data.distributionChart);
          setErrors([]);
          updateTable(
            data.distributionChart.percentiles?.find(
              (percentile) => percentile.rank === 50,
            )?.point.x as number,
            distributionProps,
            selectedCell,
          );
        }
      });
    } else {
      setErrors([]);
      setChartData(defaultDistributionChartValue);
      updateTable('', distributionProps, selectedCell);
    }
  };

  useEffect(() => {
    if (selectedCell) {
      const result = getFormDataFromTableCell(selectedCell);
      setFormData(result);
      if (checkDistributionValidation(result.parameters)) {
        getChart(result).then(
          ({ distributionChart, errors: distributionDefinitionErrors }) => {
            if (distributionChart) {
              setChartData(distributionChart);
              setErrors([]);
            } else if (distributionDefinitionErrors.length) {
              setChartData(defaultDistributionChartValue);
              setErrors(distributionDefinitionErrors);
            }
          },
        );
      } else {
        setChartData(defaultDistributionChartValue);
      }
    }
  }, [getChart, getFormDataFromTableCell, selectedCell]);

  return (
    <>
      {formData?.distributionType && (
        <DistributionSettingsForm
          onChange={handleChange}
          formData={formData}
          errors={errors}
        />
      )}
      <DistributionChart data={chartData} />
    </>
  );
};

export default DistributionSettings;
