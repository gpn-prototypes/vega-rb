import { IGridColumn, TableEntities } from 'components/ExcelTable/types';

export const getColumnsByType = (
  list: IGridColumn[],
  type: TableEntities,
): IGridColumn[] => list.filter((column: IGridColumn) => column.type === type);
