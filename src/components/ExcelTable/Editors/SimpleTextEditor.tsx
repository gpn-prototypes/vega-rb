import React from 'react';
import { EditorProps } from 'react-data-grid';
import { GridRow } from 'components/ExcelTable/types';
import { getOr } from 'lodash/fp';

import { autoFocusAndSelect } from '../helpers';

export const SimpleTextEditor: React.FC<EditorProps<GridRow | undefined>> = ({
  row,
  column,
  onRowChange,
  onClose,
}) => {
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
  ) => {
    onRowChange({
      ...row,
      [column.key]: {
        ...row?.[column.key],
        value: event.target.value,
      },
    });
    if (event.type === 'blur') {
      onClose(true);
    }
  };
  return (
    <>
      <input
        className="rdg-text-editor"
        ref={autoFocusAndSelect}
        value={getOr('', [column.key, 'value'], row)}
        onChange={handleChange}
        onBlur={handleChange}
      />
    </>
  );
};
