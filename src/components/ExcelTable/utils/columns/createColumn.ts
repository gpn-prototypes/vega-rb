import { cnCell, cnHeader } from 'components/ExcelTable/cn-excel-table';
import { GridColumn, TableEntities } from 'components/ExcelTable/types';
import { uniqueId } from 'lodash/fp';

const hasIcon = (type: TableEntities) => type === TableEntities.GEO_CATEGORY;

export function createColumn(
  genType: TableEntities = TableEntities.NONE,
): GridColumn {
  return {
    key: uniqueId('col_'),
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
