import {
    CategoryIcon,
    GridCollection,
    GridRow,
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

function convertCellsDataToGridRow<T extends CalculationParam | GeoCategory>(
    cells: string[],
    geoObjectCategories: GeoCategory[]
) {
    return geoObjectCategories
        .map(({ name }) => CATEGORIES_TYPES.get(name)!)
        .reduce(
            (prev, name, idx) => ({
                ...prev,
                [name]: cells[idx],
            }),
            {}
        ) as GridRow
}

export function unpackData({
    geoObjectCategories = [],
    calculationParameters = [],
    rows: cellsData = [],
}: ITemplateStructure): GridCollection {
    const columns: IGridColumn[] = [
        new GridColumn(SPECIAL_COLUMNS.ID),
        ...structureParamsReducer<GeoCategory>(geoObjectCategories),
        new GridColumn(SPECIAL_COLUMNS.SPLITTER),
        ...structureParamsReducer<CalculationParam>(calculationParameters),
    ]
    const rows = cellsData.map(({ cells }, idx) => ({
        id: idx,
        ...convertCellsDataToGridRow(cells, geoObjectCategories),
    }))

    return {
        columns,
        rows,
    }
}

export function packData(data: GridCollection): ITemplateStructure {
    const keys = data.columns.filter(
        (col) => col.type === TableEntities.GEO_CATEGORY
    )
    const rows = data.rows
        .filter(({ id, ...row }) => Object.values(row).length)
        .map((row) => ({
            cells: keys.map(({ key }) => row[key]),
        }))
    const geoObjectCategories = keys.map(({ name, type }) => ({
        name,
        icon: CategoryIcon.FORMATION_ICON,
        __typename: type,
    }))
    return {
        geoObjectCategories,
        calculationParameters: [],
        rows,
    }
}
