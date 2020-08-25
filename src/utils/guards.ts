import { CalculationParam, GeoCategory } from '../types'

function isCalculationParam(
    value: CalculationParam | any
): value is CalculationParam {
    return (value as CalculationParam).units !== undefined
}

function isTemplateCategory(value: GeoCategory | any): value is GeoCategory {
    return (value as GeoCategory).icon !== undefined
}

export { isCalculationParam, isTemplateCategory }
