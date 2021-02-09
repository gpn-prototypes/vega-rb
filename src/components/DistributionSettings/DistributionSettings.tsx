import React, { ReactText, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SelectedCell } from 'components/ExcelTable';
import {
  DistributionChart as IDistributionChart,
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';
import projectService from 'services/ProjectService';
import { DistributionError } from 'services/types';
import tableDuck from 'store/tableDuck';

import { percentileFieldRankTypes } from './constants';
import DistributionChart from './DistributionChart';
import DistributionSettingsForm from './DistributionSettingsForm';
import {
  defaultChartValues,
  getDefaultChartDataByType,
  getDistributionFormDataParams,
  mapEntries,
  prepareDistributionParams,
  validateDistributionParams,
} from './helpers';
import {
  DistributionChartData,
  DistributionSettingsFormData,
  DistributionSettingsParameters,
} from './types';

type DistributionSettingsData = DistributionSettingsFormData & {
  isValid?: boolean;
};
interface IProps {
  selectedCell: SelectedCell;
}

const DistributionSettings: React.FC<IProps> = ({ selectedCell }) => {
  const dispatch = useDispatch();
  const getFormDataFromTableCell = useCallback(
    (cell: SelectedCell): DistributionSettingsData => {
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
  } as DistributionSettingsData);
  const [errors, setErrors] = useState<DistributionError[]>([]);
  const [chartData, setChartData] = useState<IDistributionChart>(
    defaultChartValues,
  );

  const setFormState = useCallback((distributionData, errorsList) => {
    setErrors(errorsList);
    setChartData(distributionData);
  }, []);

  const updateTable = useCallback(
    (
      cellValue: ReactText,
      distributionProps: DistributionSettingsFormData,
      cellForUpdate,
    ) => {
      const {
        parameters,
        distributionType,
        distributionDefinitionType,
      } = distributionProps;

      if (validateDistributionParams(parameters)) {
        dispatch(
          tableDuck.actions.updateCell({
            selectedCell: cellForUpdate,
            cellData: {
              args: {
                parameters: mapEntries(parameters, prepareDistributionParams),
                type: distributionType,
                definition: distributionDefinitionType,
              },
              value: cellValue,
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

  const getChartHandler = useCallback(
    (
      distributionProps,
      onError?: () => void,
      onSuccess?: (data: DistributionChartData) => void,
    ) => {
      if (validateDistributionParams(distributionProps.parameters)) {
        getChart(distributionProps).then(
          ({ distributionChart, errors: errorsList }) => {
            if (errorsList) {
              setFormState(defaultChartValues, errorsList);
              if (onError) onError();
            } else if (distributionChart) {
              setFormState(getDefaultChartDataByType(distributionChart), []);
              if (onSuccess) onSuccess(distributionChart);
            }
          },
        );
      } else {
        setChartData(defaultChartValues);
        if (onError) onError();
      }
    },
    [getChart, setFormState],
  );

  const handleChange = (distributionProps: DistributionSettingsFormData) => {
    setFormData(distributionProps);
    getChartHandler(
      distributionProps,
      () => updateTable('', distributionProps, selectedCell),
      (distributionChart) =>
        updateTable(
          distributionChart.visiblePercentile.point.x,
          distributionProps,
          selectedCell,
        ),
    );
  };

  useEffect(() => {
    if (selectedCell) {
      const distributionData = getFormDataFromTableCell(selectedCell);

      setFormData(distributionData);
      getChartHandler(distributionData);
    }
  }, [getChartHandler, getFormDataFromTableCell, selectedCell]);

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
