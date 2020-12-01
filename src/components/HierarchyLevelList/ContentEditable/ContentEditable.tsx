import React, { useRef } from 'react';
import ContentEditable from 'react-contenteditable';

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
  const editableRef = useRef(null);
  return (
    <ContentEditable
      innerRef={editableRef}
      tagName={tag}
      className={className}
      disabled={disabled}
      html={value}
      onChange={({ target }) => {
        onChange(target.value);
      }}
    />
  );
};

export default ContentEditableField;
