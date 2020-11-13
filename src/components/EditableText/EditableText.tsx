import React, { ChangeEvent, useState } from 'react';
import { IconCheck, IconEdit } from '@gpn-prototypes/vega-icons';
import { cnEditableText } from 'components/EditableText/cn-editable-text';

import './EditableText.css';

interface EditableTextProps {
  value: string;
  onSubmit: (args: { value: string }) => void;
  prefix: string;
  className?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSubmit,
  className,
  prefix,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const onClick = () => {
    if (isEditing) {
      onSubmit({ value: localValue });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const Icon = isEditing ? IconCheck : IconEdit;

  return (
    <div className={cnEditableText.mix(className).toString()}>
      <span
        className={cnEditableText('Prefix')
          .state({ edit: isEditing })
          .toString()}
      >
        {prefix}
      </span>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        className={cnEditableText('Input')
          .state({ edit: isEditing })
          .toString()}
      />
      <button
        type="button"
        className={cnEditableText('IconWrapper')
          .state({ edit: isEditing })
          .toString()}
        onClick={onClick}
      >
        <Icon className={cnEditableText('Icon').toString()} />
      </button>
    </div>
  );
};

export default EditableText;
