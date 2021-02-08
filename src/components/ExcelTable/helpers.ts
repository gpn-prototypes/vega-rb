import { set } from 'lodash/fp';

import { ColumnProperties, GridColumn, TableEntities } from './types';

import './ExcelTable.css';

function setColumnAttributes(
  columns: GridColumn[],
  setColumns: (columnsList: GridColumn[]) => void,
  idx: number,
  properties: ColumnProperties,
): void {
  const updatedColumn = { ...columns[idx], ...properties };

  setColumns(set([idx], updatedColumn, [...columns]));
}

function columnsReorder(
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

const setColumnProps = (
  columns: GridColumn[],
  setColumns: (data: GridColumn[]) => void,
) => (idx: number, properties: ColumnProperties): void =>
  setColumnAttributes(columns, setColumns, idx, properties);

const handleColumnsReorder = (
  columns: GridColumn[],
  setColumns: (data: GridColumn[]) => void,
) => (sourceKey: string, targetKey: string): void =>
  columnsReorder(columns, setColumns, sourceKey, targetKey);

function isNoneColumnType(type: TableEntities): boolean {
  return (
    type === TableEntities.ID ||
    type === TableEntities.SPLITTER ||
    type === TableEntities.NONE
  );
}

export { setColumnProps, handleColumnsReorder, isNoneColumnType };
