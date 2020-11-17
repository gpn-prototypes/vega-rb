import { cnCell, cnHeader } from 'components/ExcelTable/cn-excel-table';
import { GridColumn, TableEntities } from 'components/ExcelTable/types';
import { v4 as uuidv4 } from 'uuid';

const hasIcon = (type: TableEntities) => type === TableEntities.GEO_CATEGORY;

export function createColumn(
  genType: TableEntities = TableEntities.NONE,
): GridColumn {
  const key = uuidv4();
  return {
    key,
    name: '',
    code: key,
    editable: true,
    resizable: true,
    sortable: true,
    cellClass: cnCell,
    headerCellClass: cnHeader,
    type: genType,
    hasIcon: hasIcon(genType),
    isRenaming: true,
  };
}
