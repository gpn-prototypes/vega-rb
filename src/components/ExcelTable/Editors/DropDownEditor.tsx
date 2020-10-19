/* eslint-disable */
// @ts-nocheck
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Editor, EditorProps } from 'react-data-grid';
import { BasicSelect } from '@consta/uikit/BasicSelect';

import { DropdownOption, GridCellProperties, GridRow } from '../types';
import { mapValues, size } from 'lodash/fp';
import { cnOption } from 'components/ExcelTable/Editors/cn-editor';

interface DropDownEditorProps<TRow>
  extends EditorProps<GridCellProperties | undefined, TRow, unknown> {
  options: Object<DropdownOption | string>;
}

type DropDownEditorHandle = Editor<GridRow>;

function DropDownEditor<TRow>(
  { column, value, onCommit, options }: DropDownEditorProps<TRow>,
  ref: React.Ref<DropDownEditorHandle>,
) {
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
      className="rdg-text-editor"
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

  // const getItemLabel = (option: SelectOption): string => option.text;
  // const getItemKey = (option: SelectOption): string => option.id;
  // const getItemValue = (option: SelectOption): string => option.value;

  // return (
  //   <BasicSelect
  //     ref={selectRef}
  //     id="city"
  //     value={value}
  //     options={Object.values(options)}
  //     getOptionLabel={getItemLabel}
  //   />
  // );
}

export default forwardRef(DropDownEditor) as <R>(
  props: DropDownEditorProps<R> & React.RefAttributes<DropDownEditorHandle>,
) => JSX.Element;
