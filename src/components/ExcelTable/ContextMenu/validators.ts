import { TableEntities } from 'components/ExcelTable/enums';
import { GridColumn } from 'components/ExcelTable/types';
import { countBy, isEqual } from 'lodash/fp';

function headerValidatorByTypes(
  columns: GridColumn[],
  type: TableEntities,
): boolean {
  const countMatchesByType = countBy(
    ({ type: columnType }) => isEqual(columnType, type),
    columns,
  ).true;

  return countMatchesByType > 1;
}

export { headerValidatorByTypes };
