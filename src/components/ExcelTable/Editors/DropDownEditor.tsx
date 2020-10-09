/* eslint-disable */
// @ts-nocheck
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Editor, EditorProps } from 'react-data-grid';

import { GridCellProperties, GridRow } from '../types';

interface Option {
  id: string;
  // title: string;
  value: string;
  text: string;
}

interface DropDownEditorProps<TRow>
  extends EditorProps<GridCellProperties | undefined, TRow, unknown> {
  options: Array<Option | string>;
}

type SelectOption = {
  label: string;
  value: string;
};

const items = [
  { label: 'Москва', value: 'moscow' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Томск', value: 'tomsk' },
];

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
      return {
        [column.key]: selectRef.current!.value || ('' as GridRow),
      };
    },
  }));

  return (
    <select
      ref={selectRef}
      className="rdg-text-editor"
      defaultValue={value?.value}
      onBlur={onCommit}
      size={options.length}
      style={{ maxHeight: 200, height: 'auto', overflowY: 'auto' }}
    >
      {/* eslint-disable-next-line no-confusing-arrow */}
      {options.map((name) =>
        typeof name === 'string' ? (
          <option key={name} value={name} onClick={onCommit}>
            {name}
          </option>
        ) : (
          <option
            key={name.id}
            value={name.value}
            // title={name.title}
            onClick={onCommit}
          >
            {name.text || name.value}
          </option>
        ),
      )}
    </select>
  );

  // const getItemLabel = (option: SelectOption): string => option.label;
  // const getItemKey = (option: SelectOption): string => option.value;
  // const getItemValue = (option: SelectOption): string => option.value;

  // return (
  //   <BasicSelect
  //     id="city"
  //     value={{ label: 'Москва', value: 'moscow' }}
  //     options={items}
  //     getOptionLabel={getItemLabel}
  //   />
  // );
}

export default forwardRef(DropDownEditor) as <R>(
  props: DropDownEditorProps<R> & React.RefAttributes<DropDownEditorHandle>,
) => JSX.Element;
