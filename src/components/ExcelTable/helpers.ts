import { ReactText } from 'react';
import { set } from 'lodash/fp';

import { GridColumn, TableEntities } from './types';

import './ExcelTable.css';

export function setColumnAttributes(
  columns: GridColumn[],
  setColumns: (columnsList: GridColumn[]) => void,
  idx: number,
  propertyName: keyof GridColumn,
  propertyValue: ReactText | boolean,
): void {
  const attributePath = [idx, propertyName];
  const nextColumns = set(attributePath, propertyValue, [...columns]);
  setColumns(nextColumns);
}

export function columnsReorder(
  columns: GridColumn[],
  setColumns: (columnsList: GridColumn[]) => void,
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
  columns: GridColumn[],
  setColumns: (columnsList: GridColumn[]) => void,
  idx: number,
): void {
  const nextColumns = [...columns];
  const column = nextColumns[idx];
  if (!column.name.trim().length) column.name = 'Новый столбец';

  column.isRenaming = false;
  setColumns(nextColumns);
}

export function isNoneColumnType(type: TableEntities): boolean {
  return (
    type === TableEntities.ID ||
    type === TableEntities.SPLITTER ||
    type === TableEntities.NONE
  );
}
