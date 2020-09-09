import { ComponentType, ReactText } from 'react';
import { FormatterProps, HeaderRendererProps } from 'react-data-grid';
import classNames from 'classnames';
import { SpecialColumns } from 'model/Table';

import { cnCell, cnCellId, cnCellSplitter, cnHeader } from './cn-excel-table';
import { GridRow, IGridColumn, TableEntities } from './types';

import './ExcelTable.css';

const cnHeaderClass = cnHeader.toString();
const cnCellClass = cnCell.toString();
const cnCellIdClass = cnCellId.toString();
const cnSplitterClass = cnCellSplitter.toString();

const setupSpecialColumnProps = (item: IGridColumn): IGridColumn => {
  switch (item.key) {
    case SpecialColumns.ID:
      return {
        ...item,
        frozen: true,
        minWidth: 40,
        maxWidth: 55,
        headerCellClass: classNames(item.headerCellClass, cnCellIdClass),
        cellClass: classNames(item.cellClass, cnCellIdClass),
      };
    case SpecialColumns.SPLITTER:
      return {
        ...item,
        maxWidth: 40,
        headerCellClass: classNames(item.headerCellClass, cnSplitterClass),
        cellClass: classNames(item.cellClass, cnSplitterClass),
      };
    default:
      return item;
  }
};

export const generateColumn = (
  genType: TableEntities = TableEntities.NONE,
): IGridColumn => {
  const hasIcon = genType === TableEntities.GEO_CATEGORY;

  return {
    key: Math.random().toString(),
    name: '',
    editable: true,
    resizable: true,
    sortable: true,
    cellClass: cnCellClass,
    headerCellClass: cnHeaderClass,
    type: genType,
    hasIcon,
    isRenaming: true,
  };
};

export const columnsFactory = (
  column: IGridColumn,
  formatter: ComponentType<FormatterProps<GridRow> & { value?: string }>,
  HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>,
): IGridColumn => {
  const item = {
    ...column,
    formatter,
    editable: true,
    resizable: true,
    sortable: true,
    minWidth: 112,
    headerCellClass: classNames(
      cnHeader.state({ renaming: !!column.isRenaming }).toString(),
    ),
    cellClass: classNames(column.cellClass, cnCellClass),
    headerRenderer: HeaderRenderer,
  };

  switch (item.type) {
    case TableEntities.CALC_PARAM:
      return {
        ...item,
        editable: false,
      };
    case TableEntities.NONE:
      return setupSpecialColumnProps(item);
    default:
      return item;
  }
};

export function setColumnAttributes(
  columns: IGridColumn[],
  setColumns: (columnsList: IGridColumn[]) => void,
  idx: number,
  propertyName: string,
  propertyValue: ReactText | boolean,
): void {
  const nextColumns = [...columns];
  // eslint-disable-next-line
  // @ts-ignore
  nextColumns[idx][propertyName] = propertyValue; // { ...nextColumns[idx], ...{[propertyName]: propertyValue}
  setColumns(nextColumns);
}

export function columnsReorder(
  columns: IGridColumn[],
  setColumns: (columnsList: IGridColumn[]) => void,
  sourceKey: string,
  targetKey: string,
): void {
  const sourceColumnIndex = columns.findIndex((c) => c.key === sourceKey);
  const targetColumnIndex = columns.findIndex((c) => c.key === targetKey);
  const reorderedColumns = [...columns];
  reorderedColumns.splice(
    targetColumnIndex,
    0,
    reorderedColumns.splice(sourceColumnIndex, 1)[0],
  );
  setColumns(reorderedColumns);
}

export function onBlurCell(
  columns: IGridColumn[],
  setColumns: (columnsList: IGridColumn[]) => void,
  idx: number,
): void {
  const nextColumns = [...columns];
  const column = nextColumns[idx];
  if (!column.name.trim().length) column.name = 'Новый столбец';

  column.isRenaming = false;
  setColumns(nextColumns);
}

// export const compose = (...fns: Function[]) =>
//   fns.reduceRight(
//     (prevFn, nextFn) => (...args: any[]) => nextFn(prevFn(...args)),
//     (value: any) => value,
//   );
