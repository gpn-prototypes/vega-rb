import React, { KeyboardEvent, ReactText } from 'react';

import Input from '../Input';

interface IProps {
  idx: number;
  name: string;
  setColumnProps: (idx: number, property: string, value: ReactText | boolean) => void;
  onBlurHandler: (idx: number) => void;
}

export const InputEditor: React.FC<IProps> = ({ name, idx, setColumnProps, onBlurHandler }) => (
  <Input
    value={name}
    onKeyPress={(event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        setColumnProps(idx, 'isRenaming', false);
      }
    }}
    onBlur={(): void => onBlurHandler(idx)}
    onChange={({ target }: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = target;
      if (value) {
        setColumnProps(idx, 'name', value);
      }
    }}
  />
);
