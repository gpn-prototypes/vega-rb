import React, { useCallback, useMemo } from 'react';
import ReactDataGrid, {
  CalculatedColumn,
  RowsUpdateEvent,
} from 'react-data-grid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AutoSizer } from 'react-virtualized';

import renderColumns from './Columns/renderColumns';
import { cnExcelTable } from './cn-excel-table';
import { HeaderContextMenu } from './ContextMenu';
import { generateColumn } from './helpers';
import StyledRow from './StyledRow';
import {
  GridCollection,
  GridRow,
  HEADER_CONTEXT_ID,
  IGridColumn,
  TableEntities,
} from './types';

import './ExcelTable.css';

const cnExcelTableClass = cnExcelTable();

interface IProps {
  data: GridCollection;
  setColumns?: (data: IGridColumn[]) => void;
  setRows?: (data: GridRow[]) => void;
  onRowClick?: (rowIdx: number, row: GridRow, column: IGridColumn) => void;
}

export const ExcelTable: React.FC<IProps> = ({
  data = { columns: [], rows: [] },
  setColumns = (): void => {},
  setRows = (): void => {},
  onRowClick = (): void => {},
}) => {
  const { columns, rows } = data;
  // eslint-disable-next-line no-unused-vars
  // const [[sortColumn, sortDirection], setSort] = useState<
  //     [string, SortDirection]
  // >(['id', 'NONE'])

  // const handleSort = useCallback(
  //     (columnKey: string, direction: SortDirection) => {
  //         setSort([columnKey, direction])
  //     },
  //     []
  // )

  const handleRowClick = useCallback(
    (
      rowIdx: number,
      row: GridRow,
      column: IGridColumn & CalculatedColumn<GridRow>,
    ) => {
      onRowClick(rowIdx, row, column);
    },
    [onRowClick],
  );

  const handleRowsUpdate = useCallback(
    ({ fromRow, toRow, updated }: RowsUpdateEvent<Partial<GridRow>>) => {
      const newRows = [...rows];

      for (let i = fromRow; i <= toRow; i += 1) {
        newRows[i] = {
          ...newRows[i],
          ...Object.entries(updated).reduce(
            (prev, [key, value]) => ({ ...prev, [key]: { value } }),
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
    const prevIdx =
      columns[insertIdx].type !== TableEntities.NONE
        ? insertIdx
        : insertIdx - 1;
    const { type } = columns[prevIdx];
    setColumns([
      ...columns.slice(0, insertIdx),
      generateColumn(type),
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
              columns={columnsList}
              rows={rows}
              width={width}
              height={height}
              rowHeight={32}
              // sortColumn={sortColumn}
              // onSort={handleSort}
              onRowClick={handleRowClick}
              onRowsUpdate={handleRowsUpdate}
              rowRenderer={StyledRow}
              enableCellCopyPaste
              enableCellDragAndDrop
              enableCellAutoFocus
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
