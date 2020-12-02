import React, { ReactText, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SelectedCell } from 'components/ExcelTable/types';
import {
  DistributionChart as IDistributionChart,
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
  Percentile,
} from 'generated/graphql';
import projectService from 'services/ProjectService';
import { DistributionError } from 'services/types';
import tableDuck from 'store/tableDuck';

import { percentileFieldRankTypes } from './constants';
import DistributionChart from './DistributionChart';
import DistributionSettingsForm from './DistributionSettingsForm';
import {
  getDistributionFormDataParams,
  mapEntries,
  prepareDistributionParams,
  validateDistributionParams,
} from './helpers';
import {
  DistributionSettingsFormData,
  DistributionSettingsParameters,
} from './types';

const defaultDistributionChartValue: IDistributionChart = {
  sf: [],
  pdf: [],
  percentiles: [],
  visiblePercentile: {
    point: {
      x: 0,
      y: 0,
    },
    rank: 90,
  },
};

interface IProps {
  selectedCell: SelectedCell;
}

const DistributionSettings: React.FC<IProps> = ({ selectedCell }) => {
  const dispatch = useDispatch();
  const getFormDataFromTableCell = useCallback(
    (
      cell: SelectedCell,
    ): DistributionSettingsFormData & { isValid: boolean } => {
      const cellProps = cell.row[cell.column.key];

      function getDefaultParams(
        type: DistributionParameterTypes,
        value: string | number,
      ) {
        const paramsValue = !percentileFieldRankTypes.includes(type)
          ? value
          : Number(value) * 100;

        return {
          [type]: paramsValue,
        };
      }

      if (cellProps?.args?.type) {
        const cellArgs = cellProps.args;
        const defaultParameters = cellArgs?.parameters.reduce(
          (prev, { type: t, value }) => ({
            ...prev,
            ...getDefaultParams(t, value),
          }),
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
        const isValid = validateDistributionParams(result.parameters);

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
  const [errors, setErrors] = useState<DistributionError[]>([]);
  const [chartData, setChartData] = useState<IDistributionChart>(
    defaultDistributionChartValue,
  );

  const updateTable = useCallback(
    (
      value: ReactText,
      distributionProps: DistributionSettingsFormData,
      cell,
    ) => {
      const {
        parameters,
        distributionType,
        distributionDefinitionType,
      } = distributionProps;

      if (validateDistributionParams(parameters)) {
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
      }
    },
    [dispatch],
  );

  const getChart = useCallback(
    ({
      parameters,
      distributionType,
      distributionDefinitionType,
    }: DistributionSettingsFormData) =>
      projectService.getDistribution({
        parameters: mapEntries(parameters, prepareDistributionParams),
        type: distributionType,
        definition: distributionDefinitionType,
      }),
    [],
  );

  const handleChange = (distributionProps: DistributionSettingsFormData) => {
    setFormData(distributionProps);

    if (validateDistributionParams(distributionProps.parameters)) {
      getChart(distributionProps).then((data) => {
        if (data.errors?.length) {
          setErrors(data.errors);
          setChartData(defaultDistributionChartValue);
          updateTable('', distributionProps, selectedCell);
        } else if (data.distributionChart) {
          setErrors([]);
          setChartData(data.distributionChart);
          updateTable(
            data.distributionChart.percentiles?.find(
              (percentile: Percentile) => percentile.rank === 50,
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
      if (validateDistributionParams(result.parameters)) {
        getChart(result).then(
          ({ distributionChart, errors: distributionDefinitionErrors }) => {
            if (distributionDefinitionErrors) {
              setChartData(defaultDistributionChartValue);
              setErrors(distributionDefinitionErrors);
            } else if (distributionChart) {
              setChartData(distributionChart);
              setErrors([]);
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
