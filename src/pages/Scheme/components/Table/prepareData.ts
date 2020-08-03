import { GridCollection, GridColumn } from 'components/ExcelTable/types'
import keysMap from './keysMap.json'

export function prepareData(data: any): GridCollection {
    const columns: GridColumn[] = []
    columns.push({
        key: 'id',
        name: '',
    })
    if (data) {
        data.forEach(({ name }: { name: string }) => {
            // @ts-ignore
            const key = keysMap[name]
            columns.push({
                key,
                name: name,
            })
        })
    }

    const rows =
        [...Array(10)].map((_, index) => ({
            id: index,
            area: '11',
            deposit: '22',
            layer: '33',
            well: '44',
            category: '55',
            probability: '66',
        })) || []

    return {
        columns,
        rows,
    }
}
