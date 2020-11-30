import React, { forwardRef, useRef } from 'react';
import { EditorProps } from 'react-data-grid';
import { presetGpnDark, Theme } from '@gpn-prototypes/vega-ui';
import {
  cnDropDownEditor,
  cnOption,
} from 'components/ExcelTable/Editors/cn-editor';
import {
  DropdownOption,
  GridCellProperties,
  GridRow,
} from 'components/ExcelTable/types';
import { size } from 'lodash/fp';

import './DropDownEditor.css';

export interface DropDownEditorProps
  extends EditorProps<GridCellProperties | undefined> {
  options: { [index: string]: DropdownOption };
  value: { value?: string | number } | undefined;
  onCommit: (
    event:
      | React.MouseEvent<HTMLOptionElement, MouseEvent>
      | React.FocusEvent<HTMLSelectElement>,
  ) => void | undefined;
  ref?: React.Ref<DropDownEditorHandle>;
}

export type DropDownEditorHandle = EditorProps<GridRow | undefined>;

function DropDownEditor<TRow>({
  column,
  value,
  onCommit,
  options,
  ref,
}: DropDownEditorProps) {
  // ref: React.Ref<DropDownEditorHandle>,
  const selectRef = useRef<HTMLSelectElement>(null);

  // useImperativeHandle(ref, () => ({
  //   getInputNode() {
  //     return selectRef.current;
  //   },
  //   getValue() {
  //     const key = selectRef.current!.value;
  //     return {
  //       [column.key]: options[key] || { value: '' },
  //     };
  //   },
  // }));

  return (
    <Theme preset={presetGpnDark}>
      <select
        ref={selectRef}
        className={cnDropDownEditor.toString()}
        defaultValue={value?.value}
        onBlur={onCommit}
        size={size(options)}
      >
        {Object.values(options).map((option) => (
          <option
            key={option.id}
            value={option.value}
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
  props: DropDownEditorProps & React.RefAttributes<DropDownEditorHandle>,
) => JSX.Element;
