import React from 'react';
import { Form } from '@gpn-prototypes/vega-ui';
import { percentileFieldTypes } from 'components/DistributionSettings/constants';
import distributionParametersMap from 'components/DistributionSettings/data';
import { DistributionSettingsFormField } from 'components/DistributionSettings/DistributionSettingsFormField';
import {
  getDistributionFormDataParams,
  getErrorMessage,
} from 'components/DistributionSettings/helpers';
import {
  DefaultField,
  DistributionSettingsFormData,
  Field,
  PercentileField,
} from 'components/DistributionSettings/types';
import EditableText from 'components/EditableText';
import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';
import { Just } from 'monet';
import { Dropdown, Option } from 'pages/Scheme/components/Dropdown';
import { DistributionError } from 'services/types';

import { cnForm } from './cn-form';
import { options } from './data';
import { getFieldStyleType } from './getInputStyleType';

import './DistributionSettingsForm.css';

interface IProps {
  onChange: (distributionData: DistributionSettingsFormData) => void;
  formData: DistributionSettingsFormData;
  errors: DistributionError[];
}

export const DistributionSettingsForm: React.FC<IProps> = ({
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
        className={cnForm('Field', 'Label')}
      />
    ) : (
      <Form.Label>{(field as DefaultField).title}</Form.Label>
    );

    return (
      <DistributionSettingsFormField
        key={key}
        label={Label}
        fieldType={getFieldStyleType(position, fields.length)}
        onChange={handleChange(key)}
        value={formData.parameters[key] ?? defaultValue}
        errorMessage={getErrorMessage(errors, key).message}
      />
    );
  };

  return (
    <Form className={cnForm()}>
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
        <div className={cnForm('Grid')}>
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
