import React, { useRef } from 'react';
import { presetGpnDark, Theme } from '@gpn-prototypes/vega-ui';
import {
  cnDropDownEditor,
  cnOption,
} from 'components/ExcelTable/Editors/cn-editor';
import { DropDownEditorProps, GridRow } from 'components/ExcelTable/types';
import { size } from 'lodash/fp';

import './DropDownEditor.css';

const DropDownEditor: React.FC<DropDownEditorProps> = ({
  column,
  row,
  onRowChange,
  options,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  return (
    <Theme preset={presetGpnDark}>
      <select
        ref={selectRef}
        className={cnDropDownEditor.toString()}
        size={size(options)}
      >
        {Object.values(options).map((option) => (
          <option
            key={option.id}
            value={option.value}
            onClick={() =>
              onRowChange(
                {
                  ...row,
                  [column.key]: option,
                } as GridRow,
                true,
              )
            }
            className={cnOption.toString()}
          >
            {option.text || option.value}
          </option>
        ))}
      </select>
    </Theme>
  );
};

export default DropDownEditor;
