import {
    GridCollection,
    IGridColumn,
    TableEntities,
} from 'components/ExcelTable/types'
import { CalculationParam, GeoCategory, ITemplateStructure } from '../types'
import { CATEGORIES_TYPES, SPECIAL_COLUMNS } from '../model/Table'
import GridColumn from '../components/ExcelTable/Models/GridColumn'

function structureParamsReducer<T extends CalculationParam | GeoCategory>(
    list: T[]
): IGridColumn[] {
    if (!list.length) return []

    return list.reduce((prev: IGridColumn[], curr: T) => {
        switch (curr.__typename) {
            case TableEntities.CALC_PARAM:
                const { code, shortName, units } = curr as CalculationParam
                return [
                    ...prev,
                    {
                        key: code,
                        name: `${shortName}, ${units}`,
                        type: TableEntities.CALC_PARAM,
                    } as IGridColumn,
                ]
            case TableEntities.GEO_CATEGORY:
                const { name } = curr as GeoCategory
                if (CATEGORIES_TYPES.has(curr.name)) {
                    return [
                        ...prev,
                        {
                            key: CATEGORIES_TYPES.get(name)!,
                            name: name,
                            type: TableEntities.GEO_CATEGORY,
                        } as IGridColumn,
                    ]
                }
            default:
                return prev
        }
    }, [])
}

export function unpackData({
    geoObjectCategories = [],
    calculationParameters = [],
}: ITemplateStructure): GridCollection {
    const columns: IGridColumn[] = [
        new GridColumn(SPECIAL_COLUMNS.ID),
        ...structureParamsReducer<GeoCategory>(geoObjectCategories),
        new GridColumn(SPECIAL_COLUMNS.SPLITTER),
        ...structureParamsReducer<CalculationParam>(calculationParameters),
    ]

    return {
        columns,
        rows: [],
    }
}

// export function packData(data: GridCollection): ITemplateStructure {
//     // const keys = data.columns.map((val) => val.key)
//     // const rows = {
//     //     cells: data.rows.reduce((prev: string[], curr) => {
//     //         keys.forEach((key) => {
//     //             prev.push(!![key] ? '' : curr[key])
//     //         })
//     //         return prev
//     //     }, []),
//     // }
//
//     const columns = data.columns.map((val) => ({
//         name: val.name,
//         icon: CategoryIcon.FIELD_ICON,
//     }))
//
//     return {
//         geoObjectCategories: columns,
//         calculationParameters: [],
//     }
// }
