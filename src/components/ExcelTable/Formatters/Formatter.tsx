import React from 'react';
import { FormatterProps } from 'react-data-grid';

import { TableEntities } from '../enums';
import { DropDownOption, GridColumn, GridRow } from '../types';

export default React.memo<FormatterProps<GridRow>>(function Formatter({
  row,
  column,
}: FormatterProps<GridRow>) {
  const col = column as GridColumn;
  const gridRow = row[column.key];

  if (gridRow === undefined) return null;
  if (col.type === TableEntities.GEO_CATEGORY_TYPE) {
    const option = gridRow as DropDownOption;
    return <>{option.text}</>;
  }

  return <>{gridRow.value}</>;
});
