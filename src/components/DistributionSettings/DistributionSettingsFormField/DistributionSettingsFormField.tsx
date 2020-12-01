import React, { ComponentProps } from 'react';
import { Form, TextField } from '@gpn-prototypes/vega-ui';
import { cnField } from 'components/DistributionSettings/DistributionSettingsFormField/cn-field';

import 'components/DistributionSettings/DistributionSettingsFormField/DistributionSettingsFormField.css';

type TextFieldProps = ComponentProps<typeof TextField>;

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
    <Form.Field className={cnField()}>
      {label}
      <TextField
        width="full"
        size="s"
        form={fieldType}
        value={value}
        onChange={onChange}
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
