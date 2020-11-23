import React, { useCallback, useMemo, useRef } from 'react';
import ReactDataGrid, { DataGridHandle } from 'react-data-grid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AutoSizer } from 'react-virtualized';

import { renderColumns } from './Columns/renderColumns';
import { cnExcelTable } from './cn-excel-table';
import { HeaderContextMenu } from './ContextMenu';
import StyledRow from './StyledRow';
import {
  GridCollection,
  GridColumn,
  GridRow,
  HEADER_CONTEXT_ID,
  SelectedCell,
  TableEntities,
  UniColumn,
} from './types';
import { createColumn, getInsertableType } from './utils';

import './ExcelTable.css';

const cnExcelTableClass = cnExcelTable();

interface IProps {
  data: GridCollection;
  selectedCell?: SelectedCell | null;
  setColumns?: (data: GridColumn[]) => void;
  setRows?: (data: GridRow[]) => void;
  onRowClick?: (rowIdx: number, row: GridRow, column: UniColumn) => void;
}

export const ExcelTable: React.FC<IProps> = ({
  data = { columns: [], rows: [] },
  setColumns = (): void => {},
  setRows = (): void => {},
  onRowClick = (): void => {},
  selectedCell = null,
}) => {
  const { columns, rows } = data;
  const gridRef = useRef<DataGridHandle>(null);

  const handleRowClick = useCallback(
    (rowIdx: number, row: GridRow, column: UniColumn) => {
      if (column.type === TableEntities.GEO_CATEGORY_TYPE) {
        gridRef.current?.selectCell({ rowIdx, idx: column.idx }, true);
      } else {
        onRowClick(rowIdx, row, column);
      }
    },
    [onRowClick],
  );

  const handleRowsUpdate = useCallback(
    ({ fromRow, toRow, updated }) => {
      const newRows = [...rows];
      for (let i = fromRow; i <= toRow; i += 1) {
        newRows[i] = {
          ...newRows[i],
          ...Object.entries(updated).reduce(
            (prev, [key, value]) => ({ ...prev, [key]: value }),
            {},
          ),
        };
      }
      setRows(newRows);
    },
    [rows, setRows],
  );

  const onColumnDelete = (
    e: React.MouseEvent<HTMLDivElement>,
    { idx }: { idx: number },
  ): void => {
    setColumns([...columns.slice(0, idx), ...columns.slice(idx + 1)]);
  };

  const pushColumn = (insertIdx: number): void => {
    setColumns([
      ...columns.slice(0, insertIdx),
      createColumn(getInsertableType(columns, insertIdx)),
      ...columns.slice(insertIdx),
    ]);
  };

  const onColumnInsertLeft = (
    e: React.MouseEvent<HTMLDivElement>,
    { idx }: { idx: number },
  ): void => pushColumn(idx);

  const onColumnInsertRight = (
    e: React.MouseEvent<HTMLDivElement>,
    { idx }: { idx: number },
  ): void => pushColumn(idx + 1);

  const columnsList = useMemo(() => renderColumns(columns, setColumns), [
    columns,
    setColumns,
  ]);
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <AutoSizer className={cnExcelTableClass}>
          {({ height, width }): JSX.Element => (
            <ReactDataGrid
              style={{ width, height }}
              ref={gridRef}
              columns={columnsList}
              rows={rows}
              rowHeight={32}
              onRowClick={handleRowClick}
              onRowsChange={handleRowsUpdate}
              rowRenderer={StyledRow}
              // enableCellCopyPaste
              // enableCellDragAndDrop
              // enableCellAutoFocus
            />
          )}
        </AutoSizer>
      </DndProvider>
      <HeaderContextMenu
        id={HEADER_CONTEXT_ID}
        onDelete={onColumnDelete}
        onInsertLeft={onColumnInsertLeft}
        onInsertRight={onColumnInsertRight}
      />
    </>
  );
};
