import { cnCell, cnHeader } from 'components/ExcelTable/cn-excel-table';
import { GridColumn, TableEntities } from 'components/ExcelTable/types';
import { v4 as uuid } from 'uuid';

const hasIcon = (type: TableEntities) => type === TableEntities.GEO_CATEGORY;

export function createColumn(props?: Partial<GridColumn>): GridColumn {
  const type = props?.type ?? TableEntities.NONE;
  const key = uuid();

  return {
    key,
    name: 'Новый столбец',
    code: key,
    editable: true,
    resizable: true,
    sortable: true,
    cellClass: cnCell,
    headerCellClass: cnHeader,
    hasIcon: hasIcon(type),
    isRenaming: true,
    visible: {
      calc: true,
      table: true,
      tree: true,
    },
    ...props,
    type,
  } as GridColumn;
}
