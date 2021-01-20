import React, { ReactText, useCallback, useMemo, useRef } from 'react';
import ReactDataGrid, {
  CalculatedColumn,
  DataGridHandle,
  FillEvent,
  PasteEvent,
} from 'react-data-grid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ContextMenuId, TableEntities } from 'components/ExcelTable/enums';
import { useUpdateErrors } from 'hooks';
import { getColumnsByType } from 'utils/getColumnsByType';

import { renderColumns } from './Columns/renderColumns';
import { cnExcelTable } from './cn-excel-table';
import { HeaderContextMenu, RowContextMenu } from './ContextMenu';
import StyledRow from './StyledRow';
import {
  ColumnErrors,
  ContextBody,
  GridCollection,
  GridColumn,
  GridRow,
  RowContextBody,
} from './types';
import { createColumn, getInsertableType } from './utils';

import './ExcelTable.css';

const cnExcelTableClass = cnExcelTable();

type CommonTableColumn = GridColumn & CalculatedColumn<GridRow>;

interface IProps {
  data: GridCollection;
  errors: ColumnErrors;
  setColumns?: (data: GridColumn[]) => void;
  setRows?: (data: GridRow[], indexes: number[]) => void;
  onRowClick?: (
    rowIdx: number,
    row: GridRow,
    column: CommonTableColumn,
  ) => void;
}

export const ExcelTable: React.FC<IProps> = ({
  data = { columns: [], rows: [] },
  errors = {},
  setColumns = (): void => {},
  setRows = (): void => {},
  onRowClick = (): void => {},
}) => {
  const { columns, rows } = data;
  const gridRef = useRef<DataGridHandle>(null);
  const updateErrors = useUpdateErrors();
  const columnsByType = useMemo(() => {
    const domainEntitiesColumns = getColumnsByType(
      data.columns,
      TableEntities.GEO_CATEGORY,
    );

    const calculationParametersColumns = getColumnsByType(
      data.columns,
      TableEntities.CALC_PARAM,
    );

    const riskColumns = getColumnsByType(data.columns, TableEntities.RISK);
    return {
      [TableEntities.GEO_CATEGORY]: domainEntitiesColumns,
      [TableEntities.CALC_PARAM]: calculationParametersColumns,
      [TableEntities.RISK]: riskColumns,
    };
  }, [data.columns]);

  const handleRowClick = useCallback(
    (rowIdx: number, row: GridRow, column: CommonTableColumn) => {
      onRowClick(rowIdx, row, column);
      if (column.type === TableEntities.GEO_CATEGORY_TYPE) {
        gridRef.current?.selectCell({ rowIdx, idx: column.idx }, true);
      }
    },
    [onRowClick],
  );

  const onRowsChange = useCallback(
    (newRows, { indexes }) => setRows(newRows, indexes),
    [setRows],
  );

  const onColumnDelete = (
    e: React.MouseEvent<HTMLDivElement>,
    { idx }: { idx: number },
  ): void => {
    const deletedColumn = columns[idx];

    setColumns([...columns.slice(0, idx), ...columns.slice(idx + 1)]);
    updateErrors(deletedColumn, columns);
  };

  const pushColumn = (insertIdx: number): void => {
    setColumns([
      ...columns.slice(0, insertIdx),
      createColumn({
        type: getInsertableType(columns, insertIdx),
      }),
      ...columns.slice(insertIdx),
    ]);
  };
  const handleFill = ({
    columnKey,
    sourceRow,
    targetRows,
  }: FillEvent<GridRow>): GridRow[] => {
    return targetRows.map((row) => ({
      ...row,
      [columnKey]: sourceRow[columnKey],
    }));
  };
  const handlePaste = ({
    sourceColumnKey,
    sourceRow,
    targetColumnKey,
    targetRow,
  }: PasteEvent<GridRow>): GridRow => {
    const isSameColumnType = (sourceKey: string, targetKey: string) =>
      (Object.keys(columnsByType) as (
        | TableEntities.GEO_CATEGORY
        | TableEntities.CALC_PARAM
        | TableEntities.RISK
      )[]).some(
        (key) =>
          columnsByType[key].find((column) => column.key === sourceKey) &&
          columnsByType[key].find((column) => column.key === targetKey),
      );

    if (isSameColumnType(sourceColumnKey, targetColumnKey)) {
      return {
        ...targetRow,
        [targetColumnKey]: sourceRow[sourceColumnKey as keyof GridRow],
      };
    }

    return targetRow;
  };
  const onColumnInsertLeft = (
    e: React.MouseEvent<HTMLDivElement>,
    { idx }: ContextBody,
  ): void => pushColumn(idx);

  const onColumnInsertRight = (
    e: React.MouseEvent<HTMLDivElement>,
    { idx }: ContextBody,
  ): void => pushColumn(idx + 1);

  const onRowDelete = (
    e: React.MouseEvent<HTMLDivElement>,
    { idx, element }: RowContextBody,
  ) => {
    setRows([
      ...rows.slice(0, idx),
      { id: element.id },
      ...rows.slice(idx + 1),
    ]);
  };

  const columnsList = useMemo(() => {
    return renderColumns(columns, errors, setColumns);
  }, [columns, setColumns, errors]);

  const rowKeyGetter = (row: GridRow) => {
    return row.id?.value as ReactText;
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ReactDataGrid
          className={cnExcelTableClass}
          ref={gridRef}
          rowKeyGetter={rowKeyGetter}
          columns={columnsList}
          rows={rows}
          rowHeight={32}
          onFill={handleFill}
          onPaste={handlePaste}
          onRowClick={handleRowClick}
          onRowsChange={onRowsChange}
          rowRenderer={StyledRow}
        />
      </DndProvider>
      <HeaderContextMenu
        id={ContextMenuId.HEADER}
        onDelete={onColumnDelete}
        onInsertLeft={onColumnInsertLeft}
        onInsertRight={onColumnInsertRight}
      />
      <RowContextMenu
        id={ContextMenuId.ROW}
        onDelete={onRowDelete}
        onInsertAbove={() => {}}
        onInsertBelow={() => {}}
      />
    </>
  );
};
