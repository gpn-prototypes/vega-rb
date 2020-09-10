import React, { KeyboardEvent, ReactText, useState } from 'react';

import Input from '../Input';

interface IProps {
  idx: number;
  name: string;
  setColumnProps: (
    idx: number,
    property: string,
    value: ReactText | boolean,
  ) => void;
  onBlurHandler: (idx: number) => void;
}

export const InputEditor: React.FC<IProps> = ({
  name,
  idx,
  setColumnProps,
  onBlurHandler,
}) => {
  const [state, setState] = useState(name);

  return (
    <Input
      value={state}
      onKeyPress={(event: KeyboardEvent): void => {
        if (event.key === 'Enter') {
          setColumnProps(
            idx,
            'name',
            !state.trim().length ? 'Новая колонка' : state,
          );
          setColumnProps(idx, 'isRenaming', false);
        }
      }}
      onBlur={(): void => {
        setColumnProps(idx, 'name', state);
        onBlurHandler(idx);
      }}
      onChange={({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        setState(target.value);
      }}
    />
  );
};
