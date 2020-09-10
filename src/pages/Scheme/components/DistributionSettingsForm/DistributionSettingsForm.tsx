import React from 'react';
import { Form } from '@gpn-prototypes/vega-form';
import { TextField } from '@gpn-prototypes/vega-text-field';
import cn from 'classnames';
import {
  DistributionDefinitionError,
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';
import { Just } from 'monet';

import { Dropdown, Option } from '../Dropdown';

import {
  DistributionParametersMap,
  DistributionSettingsFormData,
  DistributionSettingsParameters,
} from './types';

import style from './DistributionSettingsForm.module.css';

export const distributionParametersMap: DistributionParametersMap = {
  [DistributionTypes.Uniform]: {
    types: [
      {
        type: DistributionDefinitionTypes.MinMax,
        title: 'Минимум, максимум',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.MinMax]: [
        {
          key: DistributionParameterTypes.Min,
          title: 'Минимум',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Max,
          title: 'Максимум',
          defaultValue: '',
        },
      ],
    },
  },
  [DistributionTypes.Triangular]: {
    types: [
      {
        type: DistributionDefinitionTypes.ModeMinMax,
        title: 'Наиболее вероятное, минимум, максимум',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.ModeMinMax]: [
        {
          key: DistributionParameterTypes.Min,
          title: 'Минимум',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Max,
          title: 'Максимум',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Mode,
          title: 'Наиболее вероятное',
          defaultValue: '',
        },
      ],
    },
  },
  [DistributionTypes.Lognormal]: {
    types: [
      {
        type: DistributionDefinitionTypes.LocationMeanlogSdlog,
        title: 'Расположение, лог. среднее, лог. станд. отклонение',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.LocationMeanlogSdlog]: [
        {
          key: DistributionParameterTypes.Meanlog,
          title: 'Логарифмическое среднее',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Sdlog,
          title: 'Логарифмическое стандартное отклонение',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Location,
          title: 'Расположение',
          defaultValue: '',
        },
      ],
    },
  },
  [DistributionTypes.Normal]: {
    types: [
      {
        type: DistributionDefinitionTypes.MeanSd,
        title: 'Среднее, станд. отклонение',
      },
      {
        type: DistributionDefinitionTypes.MinMax,
        title: 'Минимум, максимум',
      },
    ],
    fieldsByType: {
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
          title: 'Минимум',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Max,
          title: 'Максимум',
          defaultValue: '',
        },
      ],
    },
  },
};

const options = [
  { value: DistributionTypes.Normal, label: 'Нормальное' },
  { value: DistributionTypes.Triangular, label: 'Треугольное' },
  { value: DistributionTypes.Uniform, label: 'Равномерное' },
  { value: DistributionTypes.Lognormal, label: 'Логнормальное' },
];

interface DistributionSettingsFormProps {
  onChange: ({
    distributionType,
    distributionDefinitionType,
    parameters,
  }: DistributionSettingsFormData) => void;
  formData: DistributionSettingsFormData;
  errors?: DistributionDefinitionError[];
}
const DistributionSettingsForm: React.FC<DistributionSettingsFormProps> = ({
  onChange,
  formData,
  errors,
}) => {
  const { fieldsByType, types } = distributionParametersMap[
    formData.distributionType
  ];

  const distributionDefinitionOptions = types.map((param) => ({
    label: param.title,
    value: param.type,
  }));

  const handleTypeChange = (o: Option<DistributionTypes>): void => {
    onChange({
      distributionType: o.value,
      distributionDefinitionType:
        distributionParametersMap[o.value].types[0].type,
      parameters: distributionParametersMap[o.value].fieldsByType?.[
        distributionParametersMap[o.value].types[0].type
      ]?.reduce(
        (prev, { key, defaultValue }) => ({
          ...prev,
          [key]: defaultValue,
        }),
        {},
      ) as Partial<DistributionSettingsParameters>,
    });
  };

  const handleDistributionDefinitionTypeChange = (
    o: Option<DistributionDefinitionTypes>,
  ): void => {
    onChange({
      ...formData,
      distributionDefinitionType: o.value,
      parameters: fieldsByType?.[o.value]?.reduce(
        (prev, { key, defaultValue }) => ({
          ...prev,
          [key]: defaultValue,
        }),
        {},
      ) as Partial<DistributionSettingsParameters>,
    });
  };

  // TODO: args has type TextFieldOnChangeArguments, but we cannot import it from ui-kit
  // eslint-disable-next-line
  const handleChange = (key: DistributionParameterTypes) => (args: any) => {
    onChange({
      ...formData,
      parameters: { ...formData.parameters, [key]: args.value },
    });
  };

  return (
    <Form className={style.Form}>
      <Form.Row>
        <Form.Field>
          <Form.Label>Распределение</Form.Label>
          <Dropdown
            value={Just(
              options.find((o) => o.value === formData.distributionType)!,
            )}
            options={options}
            onChange={handleTypeChange}
          />
        </Form.Field>
      </Form.Row>
      <Form.Row>
        <div className={style.Flex}>
          <Form.Field>
            <Form.Label>Параметры</Form.Label>
            <Dropdown
              value={Just(
                distributionDefinitionOptions.find(
                  (o) => o.value === formData.distributionDefinitionType,
                )!,
              )}
              options={distributionDefinitionOptions}
              onChange={handleDistributionDefinitionTypeChange}
            />
          </Form.Field>
        </div>
      </Form.Row>
      <Form.Row>
        <div className={style.Grid}>
          {fieldsByType[formData.distributionDefinitionType]?.map(
            ({ key, defaultValue, title }) => (
              <Form.Field key={key}>
                <Form.Label>{title}</Form.Label>
                <TextField
                  width="full"
                  size="s"
                  value={formData.parameters[key] ?? defaultValue}
                  onChange={handleChange(key)}
                  className={cn({
                    [style.TextField__error]: errors?.[0]?.fields.includes(key),
                  })}
                />
              </Form.Field>
            ),
          )}
        </div>
      </Form.Row>
    </Form>
  );
};

export default DistributionSettingsForm;
