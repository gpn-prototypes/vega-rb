import classNames from 'classnames'
import { GridColumn, GridRow } from './types'
import { ComponentType } from 'react'
import { HeaderRendererProps } from 'react-data-grid'
import styles from './ExcelTable.module.css'

export const generateColumn = (): GridColumn => ({
    key: Math.random().toString(),
    name: '',
    editable: true,
    resizable: true,
    sortable: true,
    cellClass: styles.Cell,
    headerCellClass: styles.Header,
    isRenaming: true,
})

export const assemblyColumns = (
    column: GridColumn,
    HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>
): GridColumn => {
    const item = {
        ...column,
        cellClass: classNames(column.cellClass, styles.Cell),
    }

    if (item.key === 'id') {
        return {
            ...item,
            frozen: true,
            minWidth: 40,
            maxWidth: 55,
            headerCellClass: classNames(styles.Header, item.headerCellClass),
        }
    } else if (item.key === 'splitter') {
        return {
            ...item,
            headerCellClass: classNames(styles.Header, item.headerCellClass),
        }
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
