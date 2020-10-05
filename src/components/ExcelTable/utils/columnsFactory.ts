import { ComponentType } from 'react';
import { HeaderRendererProps } from 'react-data-grid';

import { cnCell, cnCellId, cnCellSplitter, cnHeader } from '../cn-excel-table';
import { FormatterProps, GridRow, IGridColumn, TableEntities } from '../types';

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

function getBaseProps(
  column: IGridColumn,
  formatter: ComponentType<FormatterProps<GridRow>>,
  HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>,
) {
  return {
    formatter,
    headerCellClass: cnHeader
      .state({ renaming: !!column.isRenaming })
      .toString(),
    cellClass: cnCell.mix(column.cellClass).toString(),
    headerRenderer: HeaderRenderer,
  };
}

export function columnsFactory(
  column: IGridColumn,
  formatter: ComponentType<FormatterProps<GridRow>>,
  HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>,
): IGridColumn {
  const baseProps = getBaseProps(column, formatter, HeaderRenderer);

  switch (column.type) {
    case TableEntities.CALC_PARAM:
      return {
        ...column,
        ...baseProps,
        ...COMMON_COLUMN_PROPS,
        editable: false,
      };

    case TableEntities.RISK:
      return {
        ...column,
        ...baseProps,
        ...COMMON_COLUMN_PROPS,
        notRemovable: true,
      };

    case TableEntities.ID:
      return {
        ...column,
        ...baseProps,
        ...SUPPORT_COLUMN_PROPS,
        frozen: true,
        minWidth: 40,
        maxWidth: 55,
        headerCellClass: cnCellId.mix(baseProps.headerCellClass).toString(),
        cellClass: cnCellId.mix(baseProps.cellClass).toString(),
      };

    case TableEntities.SPLITTER:
      return {
        ...column,
        ...SUPPORT_COLUMN_PROPS,
        formatter,
        maxWidth: 40,
        headerCellClass: cnCellSplitter
          .mix(baseProps.headerCellClass)
          .toString(),
        cellClass: cnCellSplitter.mix(baseProps.cellClass).toString(),
      };

    default:
      return { ...column, ...COMMON_COLUMN_PROPS, ...baseProps };
  }
}
