import React from 'react';
import { Form } from '@gpn-prototypes/vega-form';
import { TextField } from '@gpn-prototypes/vega-text-field';

import { cnDistributionSettingsFormField } from './cn-distribution-settings-form-field';

import './DistributionSettingsFormField.css';

type TextFieldProps = React.ComponentProps<typeof TextField>;

interface IProps {
  label: React.ReactNode;
  value: string;
  onChange: TextFieldProps['onChange'];
  fieldType: TextFieldProps['form'];
  errorMessage?: string;
}

const DistributionSettingsFormField: React.FC<IProps> = ({
  value,
  onChange,
  errorMessage,
  fieldType,
  label,
}) => {
  return (
    <Form.Field className={cnDistributionSettingsFormField()}>
      {label}
      <TextField
        width="full"
        size="s"
        form={fieldType}
        value={value}
        onChange={onChange}
        className={cnDistributionSettingsFormField.state({
          error: !!errorMessage,
        })}
      />
      {errorMessage && (
        <div className={cnDistributionSettingsFormField('ErrorMessage')}>
          {errorMessage}
        </div>
      )}
    </Form.Field>
  );
};

export default DistributionSettingsFormField;
