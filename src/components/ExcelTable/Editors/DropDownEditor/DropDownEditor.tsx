/* eslint-disable */
// @ts-nocheck
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Editor, EditorProps } from 'react-data-grid';
import { useTheme } from '@consta/uikit/Theme';

import {
  DropdownOption,
  GridCellProperties,
  GridRow,
} from 'components/ExcelTable/types';
import { mapValues, size } from 'lodash/fp';
import {
  cnDropDownEditor,
  cnOption,
} from 'components/ExcelTable/Editors/cn-editor';
import { classnames } from '@bem-react/classnames';

import './DropDownEditor.css';
import classNames from 'classnames';

interface DropDownEditorProps<TRow>
  extends EditorProps<GridCellProperties | undefined, TRow, unknown> {
  options: Object<DropdownOption | string>;
}

type DropDownEditorHandle = Editor<GridRow>;

function DropDownEditor<TRow>(
  { column, value, onCommit, options }: DropDownEditorProps<TRow>,
  ref: React.Ref<DropDownEditorHandle>,
) {
  const { color: themeColors, ...themeClassNames } = useTheme().themeClassNames;
  const selectRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ({
    getInputNode() {
      return selectRef.current;
    },
    getValue() {
      const key = selectRef.current!.value;
      return {
        [column.key]: options[key] || ('' as GridRow),
      };
    },
  }));

  return (
    <select
      ref={selectRef}
      className={classNames([
        ...Object.values(themeClassNames),
        themeColors.accent,
        cnDropDownEditor.toString(),
      ])}
      defaultValue={value?.value}
      onBlur={onCommit}
      size={size(options)}
      style={{ maxHeight: 400, height: 'auto', overflowY: 'auto' }}
    >
      {/* eslint-disable-next-line no-confusing-arrow */}
      {Object.values(options).map((option) => (
        <option
          key={option.id}
          value={option.value}
          onClick={onCommit}
          className={cnOption.toString()}
          style={{
            height: 30,
          }}
        >
          {option.text || option.value}
        </option>
      ))}
    </select>
  );
}

export default forwardRef(DropDownEditor) as <R>(
  props: DropDownEditorProps<R> & React.RefAttributes<DropDownEditorHandle>,
) => JSX.Element;
