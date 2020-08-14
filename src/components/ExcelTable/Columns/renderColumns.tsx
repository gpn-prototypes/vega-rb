import React from 'react'
import { GridColumn, GridRow, HEADER_CONTEXT_ID } from '../types'
import { HeaderRendererProps } from 'react-data-grid'
import { withContextMenu } from '../ContextMenu'
import DraggableHeader from '../DraggableHeader'
import Input from '../Input'
import { assemblyColumns } from '../helpers'

const renderColumns = (
    columns: GridColumn[],
    setColumns: (data: any) => void
) => {
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
                            const nextColumns = [...columns]
                            const column = nextColumns[props.column.idx]
                            if (!column.name.trim().length)
                                column.name = 'Новый столбец'
                            column.isRenaming = false
                            setColumns(nextColumns)
                        }}
                        onChange={(event) => {
                            const value = event.target.value
                            if (value) {
                                setColumnProps(props.column.idx, 'name', value)
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
        propertyName: string,
        propertyValue: any
    ) {
        const nextColumns = [...columns]
        // @ts-ignore
        nextColumns[idx][propertyName] = propertyValue
        setColumns(nextColumns)
    }

    function handleColumnsReorder(sourceKey: string, targetKey: string) {
        const sourceColumnIndex = columns.findIndex((c) => c.key === sourceKey)
        const targetColumnIndex = columns.findIndex((c) => c.key === targetKey)
        const reorderedColumns = [...columns]
        reorderedColumns.splice(
            targetColumnIndex,
            0,
            reorderedColumns.splice(sourceColumnIndex, 1)[0]
        )

        setColumns(reorderedColumns)
    }

    return columns.map((column) => assemblyColumns(column, HeaderRenderer))
}

export default renderColumns
