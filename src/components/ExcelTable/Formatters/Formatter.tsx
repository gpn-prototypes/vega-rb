/* eslint-disable */
// @ts-nocheck
import React from 'react';
import { Button, IconSelect } from '@gpn-prototypes/vega-ui';

import {
  DropdownOption,
  FormatterProps,
  GridColumn,
  GridRow,
  TableEntities,
} from '../types';

export default React.memo<FormatterProps<GridRow>>(function Formatter({
  row,
  column,
}) {
  const col = column as GridColumn;
  const gridRow = row[column.key];

  if (gridRow === undefined) return <></>;

  if (col.type === TableEntities.GEO_CATEGORY_TYPE) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const option = gridRow as DropdownOption;
    return <>{option.text}</>;
  }

  return <>{row[column.key]?.value}</>;
});
