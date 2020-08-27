import classNames from 'classnames'
import { GridRow, IGridColumn } from './types'
import { ComponentType } from 'react'
import { HeaderRendererProps } from 'react-data-grid'
import { SPECIAL_COLUMNS } from '../../model/Table'
import styles from './ExcelTable.module.css'

export const generateColumn = (): IGridColumn => ({
    key: Math.random().toString(),
    name: '',
    editable: true,
    resizable: true,
    sortable: true,
    cellClass: styles.Cell,
    headerCellClass: styles.Header,
    isRenaming: true,
})

export const columnsFactory = (
    column: IGridColumn,
    HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>
): IGridColumn => {
    const item = {
        ...column,
        editable: true,
        resizable: true,
        sortable: true,
        minWidth: 112,
        headerCellClass: classNames(
            styles.Header,
            column.isRenaming ? styles.Renaming : null
        ),
        cellClass: classNames(column.cellClass, styles.Cell),
        headerRenderer: HeaderRenderer,
    }

    switch (item.key) {
        case SPECIAL_COLUMNS.ID:
            return {
                ...item,
                frozen: true,
                minWidth: 40,
                maxWidth: 55,
                headerCellClass: classNames(
                    item.headerCellClass,
                    styles.CellID
                ),
                cellClass: classNames(item.cellClass, styles.CellID),
            }
        case SPECIAL_COLUMNS.SPLITTER:
            return {
                ...item,
                maxWidth: 40,
                headerCellClass: classNames(
                    item.headerCellClass,
                    styles.Splitter
                ),
                cellClass: classNames(item.cellClass, styles.Splitter),
            }
        default:
            return item
    }
}

export function setColumnAttributes(
    columns: IGridColumn[],
    setColumns: Function,
    idx: number,
    propertyName: string,
    propertyValue: string | boolean | number
) {
    const nextColumns = [...columns]
    // @ts-ignore
    nextColumns[idx][propertyName] = propertyValue
    setColumns(nextColumns)
}

export function columnsReorder(
    columns: IGridColumn[],
    setColumns: Function,
    sourceKey: string,
    targetKey: string
) {
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

export function onBlurCell(
    columns: IGridColumn[],
    setColumns: Function,
    idx: number
) {
    const nextColumns = [...columns]
    const column = nextColumns[idx]
    if (!column.name.trim().length) column.name = 'Новый столбец'

    column.isRenaming = false
    setColumns(nextColumns)
}

export const getAlphabeticalKey = ((keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    let state = keys.split('')
    let position = -1

    return () => {
        position++
        if (position >= state.length) position = -1
        return state[position]
    }
})('ABCDE')

export const compose = (...fns: Function[]) =>
    fns.reduceRight(
        (prevFn, nextFn) => (...args: any[]) => nextFn(prevFn(...args)),
        (value: any) => value
    )
