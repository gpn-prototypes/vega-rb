import { ComponentType } from 'react';
import { HeaderRendererProps } from 'react-data-grid';
import {
  cnCell,
  cnCellId,
  cnCellSplitter,
  cnHeader,
} from 'components/ExcelTable/cn-excel-table';
import { Formatter, NumberFormatter } from 'components/ExcelTable/Formatters';
import {
  GridColumn,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';

import { getEditor } from '../getEditor';

import getBaseColumn from './getBaseColumn';
import getBaseProps from './getBaseProps';

const COMMON_COLUMN_PROPS = {
  editable: true,
  resizable: true,
  sortable: true,
  minWidth: 112,
};

const SUPPORT_COLUMN_PROPS = {
  editable: false,
  resizable: false,
  sortable: false,
};

export function columnsFactory(
  column: GridColumn,
  HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>,
): GridColumn {
  const getColumn = getBaseColumn(
    getBaseProps(Formatter, HeaderRenderer),
    column,
  );
  const defaultStyles = {
    headerCellClass: cnHeader
      .state({ renaming: !!column.isRenaming })
      .toString(),
    cellClass: cnCell.toString(),
  };
  const editor = getEditor(column.type);

  switch (column.type) {
    case TableEntities.CALC_PARAM:
      return getColumn({
        ...defaultStyles,
        ...COMMON_COLUMN_PROPS,
        formatter: NumberFormatter,
        editable: false,
      });

    case TableEntities.RISK:
      return getColumn({
        ...editor,
        ...defaultStyles,
        ...COMMON_COLUMN_PROPS,
        notRemovable: false,
      });

    case TableEntities.ID:
      return getColumn({
        ...defaultStyles,
        ...SUPPORT_COLUMN_PROPS,
        frozen: true,
        minWidth: 40,
        maxWidth: 55,
        headerCellClass: cnCellId.mix(cnHeader).toString(),
        cellClass: cnCellId.mix(cnCell).toString(),
      });

    case TableEntities.SPLITTER:
      return getColumn({
        ...SUPPORT_COLUMN_PROPS,
        maxWidth: 32,
        headerCellClass: cnCellSplitter.mix(cnHeader).toString(),
        cellClass: cnCellSplitter.mix(cnCell).toString(),
      });

    case TableEntities.GEO_CATEGORY_TYPE:
      return getColumn({
        ...editor,
        ...defaultStyles,
      });

    default:
      return getColumn({ ...editor, ...defaultStyles, ...COMMON_COLUMN_PROPS });
  }
}
