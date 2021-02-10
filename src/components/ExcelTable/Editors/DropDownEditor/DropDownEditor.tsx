import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Editor, EditorProps } from 'react-data-grid';
import { presetGpnDark, Theme } from '@gpn-prototypes/vega-ui';
import {
  DropDownOption,
  GridCellProperties,
  GridRow,
} from 'components/ExcelTable/types';
import { size, toPairsIn } from 'lodash/fp';

import { cnDropDownEditor, cnOption } from '../cn-editor';

import './DropDownEditor.css';

interface DropDownEditorProps<TRow>
  extends EditorProps<GridCellProperties | undefined, TRow> {
  options: { [index: string]: DropDownOption };
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
        [column.key]: options[key] || { value: '' },
      };
    },
  }));

  return (
    <Theme preset={presetGpnDark}>
      <select
        ref={selectRef}
        className={cnDropDownEditor.toString()}
        defaultValue={String(value?.value)}
        onBlur={onCommit}
        size={size(options)}
      >
        {toPairsIn(options).map(([key, option]) => (
          <option
            key={key}
            value={key}
            onClick={onCommit}
            className={cnOption.toString()}
          >
            {option.text || option.value}
          </option>
        ))}
      </select>
    </Theme>
  );
}

export default forwardRef(DropDownEditor) as <R>(
  props: DropDownEditorProps<R> & React.RefAttributes<DropDownEditorHandle>,
) => JSX.Element;
