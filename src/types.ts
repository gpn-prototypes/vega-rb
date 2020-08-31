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

export interface IProjectCell {
    cells: string[]
}

export interface IProjectStructure {
    domainEntities: GeoCategory[]
    domainObjects?: IProjectCell[]
    calculationParameters: CalculationParam[]
}

export interface ITemplateStructure {
    domainEntities: GeoCategory[]
    calculationParameters: CalculationParam[]
}
