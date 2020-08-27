import { IGridColumn, TableEntities } from '../types'

export default class GridColumn implements IGridColumn {
    readonly key: string
    name: string
    type: TableEntities

    constructor(
        key: string,
        name = '',
        type: TableEntities = TableEntities.NONE
    ) {
        this.key = key
        this.name = name
        this.type = type
    }
}
