import React from 'react';
import { Form } from '@gpn-prototypes/vega-form';
import EditableText from 'components/EditableText';
import {
  DistributionDefinitionError,
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';
import { Just } from 'monet';
import {
  DefaultField,
  DistributionSettingsFormData,
  Field,
  PercentileField,
} from 'pages/Scheme/components/DistributionSettings/types';
import { Dropdown, Option } from 'pages/Scheme/components/Dropdown';

import { percentileFieldTypes } from '../../constants';
import distributionParametersMap from '../../data';
import { getDistributionFormDataParams } from '../../helpers';
import DistributionSettingsFormField from '../DistributionSettingsFormField';

import { cnDistributionSettingsForm } from './cn-distribution-settings-form';

import './DistributionSettingsForm.css';

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
export const DistributionSettingsForm: React.FC<DistributionSettingsFormProps> = ({
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
      parameters: getDistributionFormDataParams(o.value, typeByValue),
    });
  };

  const handleDistributionDefinitionTypeChange = ({
    value,
  }: Option<DistributionDefinitionTypes>): void => {
    onChange({
      ...formData,
      distributionDefinitionType: value,
      parameters: getDistributionFormDataParams(
        formData.distributionType,
        value,
      ),
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

  const getErrorMessage = (key: string) =>
    errors?.find(({ fields }) => fields?.includes(key))?.message;

  const renderFormField = (field: Field, position: number, fields: Field[]) => {
    const {
      key,
      rankKey,
      defaultValue,
      defaultRankValue,
    } = field as PercentileField;
    const Label = percentileFieldTypes.includes(key) ? (
      <EditableText
        value={formData.parameters[rankKey] ?? defaultRankValue}
        onSubmit={handleChange(rankKey)}
        prefix="P"
        className={cnDistributionSettingsForm('Field', 'Label')}
      />
    ) : (
      <Form.Label>{(field as DefaultField).title}</Form.Label>
    );

    return (
      <DistributionSettingsFormField
        label={Label}
        fieldType={getFormFieldType(position, fields.length)}
        onChange={handleChange(key)}
        value={formData.parameters[key] ?? defaultValue}
        errorMessage={getErrorMessage(key)}
      />
    );
  };

  return (
    <Form className={cnDistributionSettingsForm()}>
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
      </Form.Row>
      <Form.Row>
        <div className={cnDistributionSettingsForm('Grid')}>
          {fieldsByType[
            formData.distributionDefinitionType
          ]?.map((field, index, fields) =>
            renderFormField(field, index, fields),
          )}
        </div>
      </Form.Row>
    </Form>
  );
};
