import React from 'react';

import { cnContentEditable } from './cn-content-editable';

import './ContentEditable.css';

interface IProps {
  onChange: (value: string) => void;
  disabled?: boolean;
  tag?: string;
  className?: string;
  value?: string;
}

const ContentEditableField: React.FC<IProps> = ({
  value = '',
  disabled,
  tag = 'span',
  className,
  onChange,
}) => {
  return (
    <span className={cnContentEditable()}>
      <input
        className={cnContentEditable('Input').mix(className).toString()}
        disabled={disabled}
        value={value}
        onChange={({ target }) => {
          onChange(target.value);
        }}
      />
    </span>
  );
};

export default ContentEditableField;
