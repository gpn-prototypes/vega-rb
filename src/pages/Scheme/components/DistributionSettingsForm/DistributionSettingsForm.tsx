import React from 'react';
import { Form } from '@gpn-prototypes/vega-form';
import { IconAlert } from '@gpn-prototypes/vega-icons';
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

import distributionParametersMap from './data';
import {
  DistributionSettingsFormData,
  DistributionSettingsParameters,
} from './types';

import style from './DistributionSettingsForm.module.css';

const options = [
  { value: DistributionTypes.Normal, label: 'Нормальное' },
  { value: DistributionTypes.Triangular, label: 'Треугольное' },
  { value: DistributionTypes.Uniform, label: 'Равномерное' },
  { value: DistributionTypes.Lognormal, label: 'Логнормальное' },
  { value: DistributionTypes.Beta, label: 'Бета' },
  { value: DistributionTypes.Pert, label: 'PERT' },
];

interface DistributionSettingsFormProps {
  onChange: (distributionData: DistributionSettingsFormData) => void;
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
    const typeByValue = distributionParametersMap[o.value].types[0].type;

    onChange({
      distributionType: o.value,
      distributionDefinitionType: typeByValue,
      parameters: distributionParametersMap[o.value].fieldsByType?.[
        typeByValue
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
  const getFormFieldType = (index: number, length: number) => {
    const isLast = index === length - 1;
    const isFirst = index === 0;
    if (isFirst) {
      return length <= 2 ? 'defaultClear' : 'defaultBrick';
    }
    if (isLast) {
      return 'brickDefault';
    }
    return 'brick';
  };
  const hasError = (key: string) => !!errors?.[0]?.fields?.includes(key);

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
            ({ key, defaultValue, title }, index, fields) => {
              return (
                <Form.Field key={key}>
                  <Form.Label>{title}</Form.Label>
                  <TextField
                    width="full"
                    size="s"
                    leftSide={hasError(key) ? IconAlert : ''}
                    form={getFormFieldType(index, fields.length)}
                    value={formData.parameters[key] ?? defaultValue}
                    onChange={handleChange(key)}
                    className={cn({
                      [style.TextField__error]: hasError(key),
                    })}
                  />
                </Form.Field>
              );
            },
          )}
        </div>
      </Form.Row>
    </Form>
  );
};

export default DistributionSettingsForm;
