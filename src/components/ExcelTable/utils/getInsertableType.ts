import { isNoneColumnType } from 'components/ExcelTable/helpers';
import { GridColumn, TableEntities } from 'components/ExcelTable/types';

export function getInsertableType(
  columnsList: GridColumn[],
  insertIdx: number,
): TableEntities {
  const prevIdx = isNoneColumnType(columnsList[insertIdx].type!)
    ? insertIdx - 1
    : insertIdx;
  return columnsList[prevIdx].type || TableEntities.NONE;
}
