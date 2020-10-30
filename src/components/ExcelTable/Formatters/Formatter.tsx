import React from 'react';

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

  if (gridRow === undefined) return null;
  if (col.type === TableEntities.GEO_CATEGORY_TYPE) {
    const option = gridRow as DropdownOption;
    return <>{option.text}</>;
  }

  return <>{gridRow.value}</>;
});
