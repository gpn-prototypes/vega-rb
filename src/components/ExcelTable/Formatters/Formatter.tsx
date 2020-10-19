import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { IconSelect } from '@gpn-prototypes/vega-icons';

import {
  DropdownOption,
  FormatterProps,
  GridColumn,
  GridRow,
  TableEntities,
} from '../types';

function geoCategoryFormatter(option: unknown) {
  return (
    <Button
      size="xs"
      iconLeft={IconSelect}
      view="ghost"
      onlyIcon
      onClick={() => console.log(option)}
    />
  );
}

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
    console.log(column, gridRow);
    const option = gridRow as DropdownOption;
    return (
      <>
        {option.text}
        {geoCategoryFormatter(option)}
      </>
    );
  }

  return <>{row[column.key]?.value ?? ''}</>;
});
