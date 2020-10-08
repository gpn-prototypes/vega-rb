import React from 'react';

import { FormatterProps, GridRow } from '../types';

export default React.memo<FormatterProps<GridRow>>(function Formatter({
  row,
  column,
}) {
  return <>{row[column.key]?.value ?? ''}</>;
});
