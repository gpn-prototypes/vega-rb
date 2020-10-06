import { cnCell, cnHeader } from 'components/ExcelTable/cn-excel-table';
import { IGridColumn, TableEntities } from 'components/ExcelTable/types';

const hasIcon = (type: TableEntities) => type === TableEntities.GEO_CATEGORY;

export function createColumn(
  genType: TableEntities = TableEntities.NONE,
): IGridColumn {
  return {
    key: Math.random().toString(),
    name: '',
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
