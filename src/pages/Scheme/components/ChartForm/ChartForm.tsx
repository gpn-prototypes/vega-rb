import React, { useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Form } from '@gpn-prototypes/vega-form';
import { TextField } from '@gpn-prototypes/vega-text-field';
import { Just } from 'monet';

import DistributionChart from '../DistributionChart';
import { Data } from '../DistributionChart/types';
import { Dropdown, Option } from '../Dropdown';

import distributionParametersMap from './distributionParametersMap.json';
import { GET_CHART_DATA, GET_NORMAL_BY_MIN_MAX } from './queries';

import style from './ChartForm.module.css';

export enum DistributionType {
  normal = 'normal',
  lognorm = 'lognorm',
  rav = 'rav',
  const = 'const',
}

const options = [
  { value: DistributionType.normal, label: 'Нормальное' },
  { value: DistributionType.lognorm, label: 'Логнормальное' },
  { value: DistributionType.rav, label: 'Равномерное' },
];

type Field = {
  key: string;
  defaultValue: string;
  title: string;
};

interface FormData {
  [key: string]: string;
}

const ChartForm: React.FC = () => {
  const [type, setType] = useState<DistributionType>(DistributionType.normal);
  const config: {
    fields: { [key: string]: Field[] };
    params: Option<string>[];
  } = distributionParametersMap[type];
  const { fields, params = [] } = config;
  const [parameters, setParameters] = useState<string>(params[0].value);
  const [formData, setFormData] = useState<FormData>({});

  const handleTypeChange = (o: Option<DistributionType>): void => {
    setType(o.value);
  };

  const [
    getNormalByDistribution,
    { data: normalByDistributionData },
  ] = useLazyQuery(GET_CHART_DATA);
  const [getNormalByMinMax, { data: normalByMinMaxData }] = useLazyQuery(
    GET_NORMAL_BY_MIN_MAX,
  );

  // TODO: args has type TextFieldOnChangeArguments, but we cannot import it from ui-kit
  // eslint-disable-next-line
  const handleChange = (key: keyof FormData) => (args: any) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: args.value }));
  };

  const renderChart = useMemo(() => {
    const getData = (): Data[] => {
      switch (parameters) {
        case 'deviation':
          return normalByDistributionData?.distribution.normalByDistribution
            .curve;
        case 'minmax':
          return normalByMinMaxData?.distribution.normalByMinMax.curve;
        default:
          return normalByDistributionData?.distribution.normalByDistribution
            .curve;
      }
    };
    return <DistributionChart data={getData() || []} />;
  }, [normalByDistributionData, normalByMinMaxData, parameters]);

  const renderFields = useMemo(() => {
    const handleChangeParams = (o: Option<string>): void => {
      setParameters(o.value);
    };
    return (
      <>
        <Form.Row>
          <div className={style.Flex}>
            <Form.Field>
              <Form.Label>Параметры</Form.Label>
              <Dropdown
                value={Just(params.find((o) => o.value === parameters)!)}
                options={params}
                onChange={handleChangeParams}
              />
            </Form.Field>
          </div>
        </Form.Row>
        <Form.Row>
          <div className={style.Flex}>
            {fields[parameters].map(({ key, defaultValue, title }) => (
              <Form.Field key={key}>
                <Form.Label>{title}</Form.Label>
                <TextField
                  width="full"
                  value={formData[key]}
                  onChange={handleChange(key)}
                />
              </Form.Field>
            ))}
          </div>
        </Form.Row>
      </>
    );
  }, [fields, formData, parameters, params]);

  useEffect(() => {
    const configParams =
      distributionParametersMap[DistributionType.normal].params[0];
    setParameters(configParams.value);
  }, [setParameters, type]);

  useEffect(() => {
    setFormData({});
  }, [parameters]);

  useEffect(() => {
    if (formData.loc && formData.standard) {
      getNormalByDistribution({
        variables: {
          deviationInput: {
            mean: parseFloat(formData.loc),
            standardDistribution: parseFloat(formData.standard),
          },
        },
      });
    }
  }, [formData.loc, formData.standard, getNormalByDistribution]);

  useEffect(() => {
    if (formData.min && formData.max) {
      getNormalByMinMax({
        variables: {
          borderConditionsInput: {
            min: formData.min,
            max: formData.max,
          },
        },
      });
    }
  }, [formData.min, formData.max, getNormalByMinMax]);

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
      {renderChart}
    </>
  );
};

export default ChartForm;
