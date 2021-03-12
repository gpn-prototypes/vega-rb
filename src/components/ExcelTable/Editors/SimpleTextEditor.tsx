import React from 'react';
import { EditorProps } from 'react-data-grid';
import { GridRow } from 'components/ExcelTable/types';
import { getOr } from 'lodash/fp';

import { autoFocusAndSelect } from '../helpers';

type IProps = EditorProps<GridRow | undefined>;
type EditorChangeEvent<T> = React.ChangeEvent<T> | React.FocusEvent<T>;

export const SimpleTextEditor: React.FC<IProps> = ({
  row,
  column,
  onRowChange,
  onClose,
}) => {
  const handleChange = ({ target }: EditorChangeEvent<HTMLInputElement>) => {
    const { value, type } = target;
    const columnKey = column.key;

    onRowChange({
      ...row,
      [columnKey]: {
        ...row?.[columnKey],
        value,
      },
    });

    if (type === 'blur') {
      onClose(true);
    }
  };

  return (
    <input
      className="rdg-text-editor"
      ref={autoFocusAndSelect}
      value={getOr('', [column.key, 'value'], row)}
      onChange={handleChange}
      onBlur={handleChange}
    />
  );
};
