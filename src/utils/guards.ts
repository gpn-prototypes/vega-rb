import { CalculationParam, GeoCategory } from 'types';

function isCalculationParam(
  value: CalculationParam | unknown,
): value is CalculationParam {
  return (value as CalculationParam).units !== undefined;
}

function isTemplateCategory(
  value: GeoCategory | unknown,
): value is GeoCategory {
  return (value as GeoCategory).icon !== undefined;
}

export { isCalculationParam, isTemplateCategory };
