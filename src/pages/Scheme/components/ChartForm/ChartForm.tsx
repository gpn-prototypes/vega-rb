import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DocumentNode, useApolloClient } from '@apollo/client';
import { Form } from '@gpn-prototypes/vega-form';
import { TextField } from '@gpn-prototypes/vega-text-field';
import {
  DistributionDefinitionError,
  DistributionDefinitionErrors,
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
  DistributionValue,
  Percentile,
  Query,
} from 'generated/graphql';
import { Just } from 'monet';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';

import DistributionChart from '../DistributionChart';
import { Dropdown, Option } from '../Dropdown';
import { SelectedRow } from '../Table/Table';

import { GET_NORMAL_BY_DEVIATION, GET_NORMAL_BY_MIN_MAX } from './queries';

import style from './ChartForm.module.css';

type Parameter = {
  type: DistributionDefinitionTypes;
  title: string;
  query: DocumentNode;
};

const distributionParametersMap: {
  [key in DistributionTypes]: {
    fields: { [key in DistributionDefinitionTypes]: Field[] };
    parameters: Parameter[];
  };
} = {
  [DistributionTypes.Normal]: {
    parameters: [
      {
        type: DistributionDefinitionTypes.MeanSd,
        title: 'Среднее, станд. отклонение',
        query: GET_NORMAL_BY_DEVIATION,
      },
      {
        type: DistributionDefinitionTypes.MinMax,
        title: 'Минимум, максимум',
        query: GET_NORMAL_BY_MIN_MAX,
      },
    ],
    fields: {
      [DistributionDefinitionTypes.MeanSd]: [
        {
          key: DistributionParameterTypes.Mean,
          title: 'Среднее',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.StandardDeviation,
          title: 'Стандартное',
          defaultValue: '',
        },
      ],
      [DistributionDefinitionTypes.MinMax]: [
        {
          key: DistributionParameterTypes.Min,
          title: 'Min',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Max,
          title: 'Max',
          defaultValue: '',
        },
      ],
    },
  },
};

const options = [{ value: DistributionTypes.Normal, label: 'Нормальное' }];
const defaultDistributionValue: DistributionValue = { sf: [], pdf: [], percentiles: [] };

type Field = {
  key: DistributionParameterTypes;
  defaultValue: string;
  title: string;
};

type FormData = {
  [key in DistributionParameterTypes]: string;
};

const ChartForm: React.FC<{ selectedRow: SelectedRow }> = ({ selectedRow }) => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const tableRows = useSelector(({ table }: RootState) => table.rows);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [errors, setErrors] = useState<DistributionDefinitionError[]>([]);
  const [type, setType] = useState<DistributionTypes>(DistributionTypes.Normal);

  const config = distributionParametersMap[type];
  const { fields, parameters } = config;
  const distributionDefinitionOptions = parameters.map((param) => ({
    label: param.title,
    value: param.type,
  }));
  const [distributionDefinition, setDistributionDefinition] = useState<DistributionDefinitionTypes>(
    DistributionDefinitionTypes.MeanSd,
  );
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [data, setData] = useState(defaultDistributionValue);

  const handleTypeChange = (o: Option<DistributionTypes>): void => {
    setType(o.value);
  };
  const updateTable = useCallback(
    (percentiles: Percentile[]) => {
      const newRows = [...tableRows];
      if (Number.isInteger(selectedRow?.rowIdx) && selectedRow) {
        newRows.splice(selectedRow.rowIdx, 1, {
          ...newRows[selectedRow.rowIdx],
          [selectedRow.column.key]: {
            ...newRows[selectedRow.rowIdx][selectedRow.column.key],
            args: {
              parameters: Object.entries(formData).map(([parameterType, value]) => ({
                type: parameterType,
                value,
              })),
              type,
              definition: distributionDefinition,
            },
            value: percentiles[1].point.x,
          },
        });
        dispatch(tableDuck.actions.updateRows(newRows));
      }
    },
    [dispatch, distributionDefinition, formData, selectedRow, tableRows, type],
  );

  const getDistributionValue = useCallback(() => {
    const query = parameters.find((param) => param.type === distributionDefinition)?.query;
    const isValid = fields[distributionDefinition].every((param) =>
      Number.isInteger(Number.parseFloat(formData[param.key])),
    );
    if (isValid && query) {
      client
        .query<Query>({
          query,
          variables: {
            distribution: {
              parameters: Object.entries(formData).map(([parameterType, value]) => ({
                type: parameterType,
                value,
              })),
              type,
              definition: distributionDefinition,
            },
          },
        })
        .then((result) => {
          if (
            (result?.data?.distribution?.distributionValue as DistributionDefinitionErrors)?.errors
          ) {
            setErrors(
              (result?.data?.distribution?.distributionValue as DistributionDefinitionErrors)
                ?.errors,
            );
          } else if (result?.data?.distribution?.distributionValue) {
            setData(result.data.distribution.distributionValue as DistributionValue);
            setErrors([]);
            updateTable(
              (result.data.distribution.distributionValue as DistributionValue).percentiles,
            );
          }
        });
    }
  }, [client, distributionDefinition, fields, formData, parameters, type, updateTable]);

  // TODO: args has type TextFieldOnChangeArguments, but we cannot import it from ui-kit
  // eslint-disable-next-line
  const handleChange = (key: DistributionParameterTypes) => (args: any) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: args.value }));
  };

  const renderFields = useMemo(() => {
    const handleChangeParams = (o: Option<DistributionDefinitionTypes>): void => {
      setDistributionDefinition(o.value);
      setFormData({} as FormData);
      setData(defaultDistributionValue);
      setErrors([]);
    };
    return (
      <>
        <Form.Row>
          <div className={style.Flex}>
            <Form.Field>
              <Form.Label>Параметры</Form.Label>
              <Dropdown
                value={Just(
                  distributionDefinitionOptions.find((o) => o.value === distributionDefinition)!,
                )}
                options={distributionDefinitionOptions}
                onChange={handleChangeParams}
              />
            </Form.Field>
          </div>
        </Form.Row>
        <Form.Row>
          <div className={style.Flex}>
            {fields[distributionDefinition].map(({ key, defaultValue, title }) => (
              <Form.Field key={key}>
                <Form.Label>{title}</Form.Label>
                <TextField
                  width="full"
                  value={formData[key] ?? defaultValue}
                  onChange={handleChange(key)}
                  className={errors?.[0]?.fields.includes(key) ? style.TextField__error : ''}
                />
              </Form.Field>
            ))}
          </div>
        </Form.Row>
      </>
    );
  }, [errors, distributionDefinition, distributionDefinitionOptions, fields, formData]);

  useEffect(() => {
    setDistributionDefinition(distributionParametersMap[type].parameters[0].type);
    setFormData({} as FormData);
    setData(defaultDistributionValue);
    setErrors([]);
  }, [type]);

  useEffect(() => {
    getDistributionValue();
    // eslint-disable-next-line
  }, [formData]);

  useEffect(() => {
    if (selectedRow) {
      const { row, column } = selectedRow;
      if (row[column.key]?.args?.parameters) {
        setDistributionDefinition(
          (row[column.key]?.args?.definition as DistributionDefinitionTypes) ||
            DistributionDefinitionTypes.MeanSd,
        );
        setFormData(
          row[column.key]?.args?.parameters.reduce(
            (prev, { type: t, value }) => ({ ...prev, [t]: value }),
            {},
          ) as FormData,
        );
      } else {
        setFormData({} as FormData);
        setData(defaultDistributionValue);
        setErrors([]);
      }
    }
  }, [selectedRow]);

  return (
    <>
      <Form className={style.Form}>
        <Form.Row>
          <Form.Field>
            <Form.Label>Распределение</Form.Label>
            <Dropdown
              value={Just(options.find((o) => o.value === type)!)}
              options={options}
              onChange={handleTypeChange}
            />
          </Form.Field>
        </Form.Row>
        {renderFields}
      </Form>
      <DistributionChart data={data} />
    </>
  );
};

export default ChartForm;
