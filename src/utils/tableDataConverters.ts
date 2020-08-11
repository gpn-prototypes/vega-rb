import { GridCollection, GridColumn } from 'components/ExcelTable/types'
import { TemplateCategory, TemplateStructure } from '../types'
import { CATEGORIES_TYPES } from '../model/Table'

function categoriesReducer(categoriesList: TemplateCategory[]) {
    return categoriesList.reduce((prev: GridColumn[], curr) => {
        if (CATEGORIES_TYPES.has(curr.name)) {
            return [
                ...prev,
                {
                    key: CATEGORIES_TYPES.get(curr.name),
                    name: curr.name,
                } as GridColumn,
            ]
        }
        return prev
    }, [])
}

export function unpackData({
    geoObjectCategories = [],
    rows = [],
}: TemplateStructure): GridCollection {
    const columns: GridColumn[] = [
        {
            key: 'id',
            name: '',
        },
    ]

    if (geoObjectCategories) {
        const categoriesList = categoriesReducer(geoObjectCategories)
        columns.push(...categoriesList)
    }

    // const keysList = geoObjectCategories
    //     .map((val) => CATEGORIES_TYPES.get(val.name))
    //     .filter(Boolean)

    // const tableRows = rows.map(
    //     (row) =>
    //         Object.fromEntries(
    //             new Map(row.cells.map((cell, index) => [keysList[index], cell]))
    //         ) as GridRow
    // )

    return {
        columns,
        rows: [],
    }
}

export function packData(data: GridCollection): TemplateStructure {
    const keys = data.columns.map((val) => val.key)
    const rows = data.rows.map((el: { [index: string]: any }) => {
        let cells: string[] = []
        keys.forEach((key) => {
            const val = el[key] === undefined ? '' : el[key]
            cells.push(val)
        })
        return { cells }
    })
    const columns = data.columns.map((val) => ({ name: val.name }))

    return {
        geoObjectCategories: columns,
        rows,
    }
}
