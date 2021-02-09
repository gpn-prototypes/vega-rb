import { TableEntities } from 'components/ExcelTable/enums';
import { GridColumn } from 'components/ExcelTable/types';

export const getColumnsByType = (
  list: GridColumn[],
  type: TableEntities,
): GridColumn[] => list.filter((column: GridColumn) => column.type === type);
