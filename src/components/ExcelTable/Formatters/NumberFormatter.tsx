import React from 'react';
import { defaultTo, eq, isFinite, toNumber } from 'lodash/fp';
import { roundTo } from 'utils';

import { FormatterProps, GridRow } from '../types';

export default React.memo<FormatterProps<GridRow>>(function NumberFormatter({
  row,
  column,
}) {
  const value = defaultTo('', row[column.key]?.value);
  const result =
    !eq(value, '') && isFinite(toNumber(value))
      ? roundTo(3, toNumber(value))
      : value;
  return <>{result}</>;
});
