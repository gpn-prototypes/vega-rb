import React, { useCallback, useMemo, useRef } from 'react';
import ReactDataGrid, {
  CalculatedColumn,
  DataGridHandle,
  RowsUpdateEvent,
} from 'react-data-grid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AutoSizer } from 'react-virtualized';
import { useUpdateErrors } from 'hooks';

import { renderColumns } from './Columns/renderColumns';
import { cnExcelTable } from './cn-excel-table';
import { HeaderContextMenu } from './ContextMenu';
import StyledRow from './StyledRow';
import {
  GridCollection,
  GridColumn,
  GridRow,
  HEADER_CONTEXT_ID,
  TableEntities,
} from './types';
import { createColumn, getInsertableType } from './utils';

import './ExcelTable.css';

const cnExcelTableClass = cnExcelTable();

type CommonTableColumn = GridColumn & CalculatedColumn<GridRow>;

interface IProps {
  data: GridCollection;
  setColumns?: (data: GridColumn[]) => void;
  setRows?: (data: GridRow[]) => void;
  onRowClick?: (
    rowIdx: number,
    row: GridRow,
    column: CommonTableColumn,
  ) => void;
}

export const ExcelTable: React.FC<IProps> = ({
  data = { columns: [], rows: [], errors: {} },
  setColumns = (): void => {},
  setRows = (): void => {},
  onRowClick = (): void => {},
}) => {
  const { columns, rows, errors } = data;
  const gridRef = useRef<DataGridHandle>(null);
  const updateErrors = useUpdateErrors();

  const handleRowClick = useCallback(
    (rowIdx: number, row: GridRow, column: CommonTableColumn) => {
      onRowClick(rowIdx, row, column);

      if (column.type === TableEntities.GEO_CATEGORY_TYPE) {
        gridRef.current?.selectCell({ rowIdx, idx: column.idx }, true);
      }
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

  const onColumnInsertLeft = (
    e: React.MouseEvent<HTMLDivElement>,
    { idx }: { idx: number },
  ): void => pushColumn(idx);

  const onColumnInsertRight = (
    e: React.MouseEvent<HTMLDivElement>,
    { idx }: { idx: number },
  ): void => pushColumn(idx + 1);

  const columnsList = useMemo(() => {
    return renderColumns(columns, errors, setColumns);
  }, [columns, setColumns, errors]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div style={{ height: '100%', flex: 1 }}>
          <AutoSizer className={cnExcelTableClass}>
            {({ height, width }): JSX.Element => (
              <ReactDataGrid
                ref={gridRef}
                columns={columnsList}
                rows={rows}
                width={width}
                height={height}
                rowHeight={32}
                onRowClick={handleRowClick}
                onRowsUpdate={handleRowsUpdate}
                rowRenderer={StyledRow}
                enableCellCopyPaste
                enableCellDragAndDrop
                enableCellAutoFocus
              />
            )}
          </AutoSizer>
        </div>
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
