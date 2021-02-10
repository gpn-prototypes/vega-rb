import { TableEntities } from 'components/ExcelTable/enums';
import { isNoneColumnType } from 'components/ExcelTable/helpers';
import { GridColumn } from 'components/ExcelTable/types';

export function getInsertableType(
  columnsList: GridColumn[],
  insertIdx: number,
): TableEntities {
  const listSize = columnsList.length - 1;

  const prevIndex = insertIdx - 1;
  const nextIndex = insertIdx > listSize ? insertIdx - 1 : insertIdx;

  const validate = () =>
    (isNoneColumnType(columnsList[nextIndex].type!) ||
      TableEntities.GEO_CATEGORY_TYPE) &&
    !isNoneColumnType(columnsList[prevIndex].type!);

  const indexPosition = validate() ? insertIdx - 1 : insertIdx;

  return columnsList[indexPosition].type || TableEntities.NONE;
}
