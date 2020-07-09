import { CalculatedColumn, Column } from 'react-data-grid'

export interface GridRow {
    id: number
    area: string
    deposit: string
    layer: string
    well: number
    category: string
    probability: number
}

export interface GridColumn extends Column<GridRow> {
    isRenaming?: boolean
}

export interface GridCollection {
    columns: GridColumn[]
    rows: GridRow[]
}
