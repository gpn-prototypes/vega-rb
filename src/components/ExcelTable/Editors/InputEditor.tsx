import React, { KeyboardEvent, ReactElement, useState } from 'react';
import { GridColumn, SetColumnProperty } from 'components/ExcelTable/types';

import Input from '../Input';

interface IProps<T> {
  idx: number;
  name: string | ReactElement;
  setColumnProps: SetColumnProperty<T>;
  onBlurHandler: (idx: number) => void;
}

export const InputEditor: React.FC<IProps<GridColumn>> = ({
  name,
  idx,
  setColumnProps,
  onBlurHandler,
}) => {
  const [state, setState] = useState(name);

  return (
    <Input
      value={state as string}
      onKeyPress={(event: KeyboardEvent): void => {
        if (event.key === 'Enter') {
          setColumnProps(
            idx,
            'name',
            (() => {
              if (typeof state === 'string') {
                return !state.trim().length ? 'Новая колонка' : state;
              }
              return (state as unknown) as string;
            })(),
          );
          setColumnProps(idx, 'isRenaming', false);
        }
      }}
      onBlur={(): void => {
        setColumnProps(idx, 'name', state as string);
        onBlurHandler(idx);
      }}
      onChange={({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        setState(target.value);
      }}
    />
  );
};
