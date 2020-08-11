import { Column } from 'react-data-grid'

export interface GridRow {
    id: number
    [index: string]: any
}

export interface GridColumn extends Column<GridRow> {
    isRenaming?: boolean
}

export interface GridCollection {
    columns: GridColumn[]
    rows: GridRow[]
}
