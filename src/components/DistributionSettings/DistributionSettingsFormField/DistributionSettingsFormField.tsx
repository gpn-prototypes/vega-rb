import React, { ReactText } from 'react';
import { Form, TextField } from '@gpn-prototypes/vega-ui';
import { IValuableStructure, NoopFunction } from 'types';

import { cnField } from './cn-field';
import { TextFieldOnChange, TextFieldProps } from './types';

import './DistributionSettingsFormField.css';

interface IProps {
  label: React.ReactNode;
  value: ReactText;
  onChange?: NoopFunction<IValuableStructure>;
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
    <Form.Field className={cnField()}>
      {label}
      <TextField
        width="full"
        size="s"
        form={fieldType}
        value={String(value)}
        onChange={onChange as TextFieldOnChange}
        className={cnField.state({
          error: !!errorMessage,
        })}
      />
      {errorMessage && (
        <div className={cnField('ErrorMessage')}>{errorMessage}</div>
      )}
    </Form.Field>
  );
};

export default DistributionSettingsFormField;
