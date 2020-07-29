import React, { useCallback, useMemo, useState } from 'react'
import ReactDataGrid, {
    HeaderRendererProps,
    RowsUpdateEvent,
    SortDirection,
} from 'react-data-grid'
import classNames from 'classnames'
import 'react-data-grid/dist/react-data-grid.css'
import { GridCollection, GridColumn, GridRow } from './types'
import { DraggableHeader } from './DraggableHeader/DraggableHeader'
import { HTML5Backend } from 'react-dnd-html5-backend'
import StyledRow from './StyledRow'
import { HeaderContextMenu, withContextMenu } from './ContextMenu'
import { DndProvider } from 'react-dnd'
import { AutoSizer } from 'react-virtualized'
import Input from './Input'
import styles from './ExcelTable.module.css'
import './react-data-grid.css'

interface IProps {
    data: GridCollection
}

const HEADER_CONTEXT_ID = 'header-context-menu'

export default function ExcelTable({ data }: IProps) {
    const [rows, setRows] = useState(data.rows)
    const [columns, setColumns] = useState(data.columns)
    const [[sortColumn, sortDirection], setSort] = useState<
        [string, SortDirection]
    >(['id', 'NONE'])

    const renderColumns = useMemo(() => {
        function HeaderRenderer(
            props: HeaderRendererProps<GridRow> & { column: GridColumn }
        ) {
            return withContextMenu(
                <DraggableHeader
                    {...props}
                    onColumnsReorder={handleColumnsReorder}
                    onDoubleClick={() => {
                        setColumnProps(props.column.idx, 'isRenaming', true)
                    }}
                    editor={
                        <Input
                            value={props.column.name}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    setColumnProps(
                                        props.column.idx,
                                        'isRenaming',
                                        false
                                    )
                                }
                            }}
                            onBlur={() => {
                                setColumns((prevState) => {
                                    const state = [...prevState]
                                    const column = state[props.column.idx]
                                    if (!column.name.trim().length)
                                        column.name = 'Новый столбец'
                                    column.isRenaming = false
                                    return state
                                })
                            }}
                            onChange={(event) => {
                                const value = event.target.value
                                if (value) {
                                    setColumnProps(
                                        props.column.idx,
                                        'name',
                                        value
                                    )
                                }
                            }}
                        />
                    }
                />,
                {
                    id: HEADER_CONTEXT_ID,
                    collect: () => ({ idx: props.column.idx }),
                }
            )
        }

        function setColumnProps(
            idx: number,
            propertyName: any,
            propertyValue: any
        ) {
            setColumns((prevState) => {
                const state = [...prevState]
                // @ts-ignore
                state[idx][propertyName] = propertyValue
                return state
            })
        }

        function handleColumnsReorder(sourceKey: string, targetKey: string) {
            const sourceColumnIndex = columns.findIndex(
                (c) => c.key === sourceKey
            )
            const targetColumnIndex = columns.findIndex(
                (c) => c.key === targetKey
            )
            const reorderedColumns = [...columns]

            reorderedColumns.splice(
                targetColumnIndex,
                0,
                reorderedColumns.splice(sourceColumnIndex, 1)[0]
            )

            setColumns(reorderedColumns)
        }

        function assemblyColumns(column: GridColumn) {
            const item = { ...column, cellClass: styles.Cell }

            if (item.key === 'id')
                return {
                    ...item,
                    frozen: true,
                    width: 1,
                    headerCellClass: styles.Header,
                }

            return {
                ...item,
                editable: true,
                resizable: true,
                sortable: true,
                headerCellClass: classNames(
                    styles.Header,
                    item.isRenaming ? styles.Renaming : null
                ),
                headerRenderer: HeaderRenderer,
            }
        }

        return columns.map(assemblyColumns)
    }, [columns])

    const handleSort = useCallback(
        (columnKey: string, direction: SortDirection) => {
            setSort([columnKey, direction])
        },
        []
    )

    const handleRowsUpdate = useCallback(
        ({ fromRow, toRow, updated }: RowsUpdateEvent<Partial<GridRow>>) => {
            const newRows = [...rows]

            for (let i = fromRow; i <= toRow; i++) {
                newRows[i] = { ...newRows[i], ...updated }
            }

            setRows(newRows)
        },
        [rows]
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

    function pushColumn(insertIdx: number) {
        const newCol = getNewColumn()

        setColumns([
            ...columns.slice(0, insertIdx),
            newCol,
            ...columns.slice(insertIdx),
        ])
    }

    function getNewColumn(): GridColumn {
        return {
            key: Math.random().toString(),
            name: '',
            editable: true,
            resizable: true,
            sortable: true,
            cellClass: styles.Cell,
            headerCellClass: styles.Header,
            isRenaming: true,
        }
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <AutoSizer className={styles.Root}>
                    {({ height, width }) => (
                        <ReactDataGrid
                            columns={renderColumns}
                            rows={rows}
                            width={width}
                            height={height}
                            rowHeight={32}
                            sortColumn={sortColumn}
                            onSort={handleSort}
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
