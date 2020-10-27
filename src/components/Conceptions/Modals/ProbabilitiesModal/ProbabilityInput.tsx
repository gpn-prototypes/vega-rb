import React, { ReactText } from 'react';
import { Text, TextField } from '@gpn-prototypes/vega-ui';
import { Conception } from 'types';

import { cnModal } from './cn-modal';

interface ProbabilityInputProps {
  conception: Conception;
  onChange: (probability: ReactText) => void;
}

export const ProbabilityInput: React.FC<ProbabilityInputProps> = ({
  conception,
  onChange,
}) => (
  <div className={cnModal('Wrapper')}>
    <Text size="s" className={cnModal('Wrapper', 'Left').toString()}>
      {conception.title}
    </Text>
    <TextField
      size="s"
      className={cnModal('Wrapper', 'Right').toString()}
      value={String(conception.probability)}
      onChange={({ value }) => {
        onChange(value === null ? 0 : value);
      }}
    />
  </div>
);
