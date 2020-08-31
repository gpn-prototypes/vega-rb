import {
    CategoryIcon,
    GridCollection,
    GridRow,
    IGridColumn,
    TableEntities,
} from 'components/ExcelTable/types'
import {
    CalculationParam,
    GeoCategory,
    IProjectStructure,
    ITemplateStructure,
} from '../types'
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
                return prev
            default:
                return prev
        }
    }, [])
}

function convertCellsDataToGridRow<T extends CalculationParam | GeoCategory>(
    cells: string[],
    domainEntities: GeoCategory[]
) {
    return domainEntities
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
    domainEntities = [],
    calculationParameters = [],
    domainObjects: cellsData = [],
}: IProjectStructure): GridCollection {
    const columns: IGridColumn[] = [
        new GridColumn(SPECIAL_COLUMNS.ID),
        ...structureParamsReducer<GeoCategory>(domainEntities),
        new GridColumn(SPECIAL_COLUMNS.SPLITTER),
        ...structureParamsReducer<CalculationParam>(calculationParameters),
    ]
    const rows = [
        ...cellsData.map(({ cells }, idx) => ({
            id: idx,
            ...convertCellsDataToGridRow(cells, domainEntities),
        })),
        ...Array.from({ length: 1000 - cellsData.length }, (_, index) => ({
            id: index,
        })),
    ]

    return {
        columns,
        rows,
    }
}

export function packData(
    data: GridCollection,
    template: ITemplateStructure
): IProjectStructure {
    const domainEntitiesKeys = data.columns.filter(
        (col) => col.type === TableEntities.GEO_CATEGORY
    )
    const calculationParametersKeys = data.columns.filter(
        (col) => col.type === TableEntities.CALC_PARAM
    )
    const domainObjects = data.rows
        .filter((row) => domainEntitiesKeys.every(({ key }) => row[key]))
        .map((row) => ({
            cells: domainEntitiesKeys.map(({ key }) => row[key]),
        }))
    const domainEntities = domainEntitiesKeys.map(({ name, type }) => ({
        name,
        icon: CategoryIcon.FORMATION_ICON,
        __typename: type,
    }))
    const calculationParameters = calculationParametersKeys.map(
        ({ key }) =>
            ({
                ...template.calculationParameters.find(
                    ({ code }) => code === key
                ),
            } as CalculationParam)
    )
    return {
        domainEntities,
        calculationParameters,
        domainObjects,
    }
}
