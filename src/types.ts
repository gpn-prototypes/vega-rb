import { CategoryIcon } from './components/ExcelTable/types'

export interface GeoCategory {
    __typename?: string
    name: string
    icon: CategoryIcon
}

export interface CalculationParam {
    __typename?: string
    code: string
    name: string
    shortName: string
    units: string
}

export interface TemplateCell {
    cells: string[]
}

export interface ITemplateStructure {
    geoObjectCategories: GeoCategory[]
    calculationParameters: CalculationParam[]
    rows?: TemplateCell[]
}
