import React, { useCallback, useMemo } from 'react'
import ReactDataGrid, { RowsUpdateEvent } from 'react-data-grid'
import 'react-data-grid/dist/react-data-grid.css'
import { GridCollection, GridRow, HEADER_CONTEXT_ID } from './types'
import { HTML5Backend } from 'react-dnd-html5-backend'
import StyledRow from './StyledRow'
import { HeaderContextMenu } from './ContextMenu'
import { DndProvider } from 'react-dnd'
import { AutoSizer } from 'react-virtualized'
import styles from './ExcelTable.module.css'
import './react-data-grid.css'
import { generateColumn } from './helpers'
import renderColumns from './Columns/renderColumns'

interface IProps {
    data: GridCollection
    setColumns?: (data: any) => void
    setRows?: (data: any) => void
}

export default function ExcelTable({
    data = { columns: [], rows: [] },
    setColumns = () => {},
    setRows = () => {},
}: IProps) {
    const { columns, rows } = data
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

    const handleRowsUpdate = useCallback(
        ({ fromRow, toRow, updated }: RowsUpdateEvent<Partial<GridRow>>) => {
            const newRows = [...rows]

            for (let i = fromRow; i <= toRow; i++) {
                newRows[i] = { ...newRows[i], ...updated }
            }

            setRows(newRows)
        },
        [rows, setRows]
    )

    const onColumnDelete = (
        e: React.MouseEvent<HTMLDivElement>,
        { idx }: { idx: number }
    ) => {
        setColumns([...columns.slice(0, idx), ...columns.slice(idx + 1)])
    }

    const onColumnInsertLeft = (
        e: React.MouseEvent<HTMLDivElement>,
        { idx }: { idx: number }
    ) => pushColumn(idx)

    const onColumnInsertRight = (
        e: React.MouseEvent<HTMLDivElement>,
        { idx }: { idx: number }
    ) => pushColumn(idx + 1)

    const pushColumn = (insertIdx: number) => {
        setColumns([
            ...columns.slice(0, insertIdx),
            generateColumn(),
            ...columns.slice(insertIdx),
        ])
    }

    const columnsList = useMemo(() => {
        return renderColumns(columns, setColumns)
    }, [columns, setColumns])

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <AutoSizer className={styles.Root}>
                    {({ height, width }) => (
                        <ReactDataGrid
                            columns={columnsList}
                            rows={rows}
                            width={width}
                            height={height}
                            rowHeight={32}
                            // sortColumn={sortColumn}
                            // onSort={handleSort}
                            onRowsUpdate={handleRowsUpdate}
                            rowRenderer={StyledRow}
                            enableCellCopyPaste
                            enableCellDragAndDrop
                        />
                    )}
                </AutoSizer>
            </DndProvider>
            <HeaderContextMenu
                id={HEADER_CONTEXT_ID}
                title={'Insert StyledColumn'}
                onDelete={onColumnDelete}
                onInsertLeft={onColumnInsertLeft}
                onInsertRight={onColumnInsertRight}
            />
        </>
    )
}
