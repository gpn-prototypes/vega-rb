import { BaseProps, GridColumn } from 'components/ExcelTable/types';
import { curry } from 'lodash/fp';

const getBaseColumn = curry<
  BaseProps,
  GridColumn,
  // TODO: implement types of extraProps
  // eslint-disable-next-line @typescript-eslint/ban-types
  Object,
  GridColumn
>((baseProps, column, extraProps) => {
  return {
    ...column,
    ...baseProps,
    ...extraProps,
  };
});

export default getBaseColumn;
