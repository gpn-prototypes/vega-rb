import React, { useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';

interface ContentEditableField {
  value?: string;
  disabled?: boolean;
  tag?: string;
  className?: string;
  onChange: (value: string) => void;
}
const ContentEditableField: React.FC<ContentEditableField> = ({
  value: initialValue = '',
  disabled,
  tag = 'span',
  className,
}) => {
  const editableRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  return (
    <ContentEditable
      innerRef={editableRef}
      tagName={tag}
      className={className}
      disabled={disabled}
      html={value}
      onPaste={(e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        document.execCommand('insertText', false, text);
      }}
      onChange={(e) => {
        const { value: str } = e.target;
        setValue(str);
      }}
    />
  );
};

export default ContentEditableField;
