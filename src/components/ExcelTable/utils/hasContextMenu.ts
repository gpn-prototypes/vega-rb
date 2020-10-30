import { isNoneColumnType } from 'components/ExcelTable/helpers';
import { TableEntities } from 'components/ExcelTable/types';

export function hasContextMenu(type: TableEntities): boolean {
  return !(isNoneColumnType(type) || type === TableEntities.GEO_CATEGORY_TYPE);
}
