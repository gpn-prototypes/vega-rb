import React from 'react';
import { isFinite, round, toNumber } from 'lodash';

import { FormatterProps, GridRow } from '../types';

export default React.memo<FormatterProps<GridRow>>(function NumberFormatter({
  row,
  column,
}) {
  const value = row[column.key]?.value ?? '';
  const result = isFinite(toNumber(value)) ? round(toNumber(value), 3) : value;

  return <>{result}</>;
});
