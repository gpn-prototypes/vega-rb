import { TableEntities } from 'components/ExcelTable/enums';
import { isNoneColumnType } from 'components/ExcelTable/helpers';

export function hasContextMenu(type: TableEntities): boolean {
  return !(isNoneColumnType(type) || type === TableEntities.GEO_CATEGORY_TYPE);
}
