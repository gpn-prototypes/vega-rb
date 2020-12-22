import React, { KeyboardEvent, useState } from 'react';
import { GridColumn, SetColumnProperties } from 'components/ExcelTable/types';

import Input from '../Input';

const DEFAULT_TITLE = 'Новый столбец';

interface IProps<T> {
  idx: number;
  name: string;
  setColumnProps: SetColumnProperties;
}

export const InputEditor: React.FC<IProps<GridColumn>> = ({
  name,
  idx,
  setColumnProps,
}) => {
  const [state, setState] = useState(name);
  const onSave = () =>
    setColumnProps(idx, {
      name: !state.trim().length ? DEFAULT_TITLE : state.trim(),
      isRenaming: false,
    });

  return (
    <Input
      value={state}
      onKeyPress={(event: KeyboardEvent): void => {
        if (event.key === 'Enter') onSave();
      }}
      onBlur={onSave}
      onChange={({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        setState(target.value);
      }}
    />
  );
};
