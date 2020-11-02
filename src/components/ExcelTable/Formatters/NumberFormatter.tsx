import React from 'react';
import { defaultTo, eq, isFinite, round, toNumber } from 'lodash';

import { FormatterProps, GridRow } from '../types';

export default React.memo<FormatterProps<GridRow>>(function NumberFormatter({
  row,
  column,
}) {
  const value = defaultTo(row[column.key]?.value, '');
  const result =
    !eq(value, '') && isFinite(toNumber(value))
      ? round(toNumber(value), 3)
      : value;
  return <>{result}</>;
});
