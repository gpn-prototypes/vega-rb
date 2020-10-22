import {
  CategoryIcon,
  GridCollection,
  TableEntities,
} from 'components/ExcelTable/types';
import { CalculationParam, ProjectStructure, Risk } from 'types';

import { getColumnsByType } from './getColumnsByType';

export function packTableData(
  data: GridCollection,
  template: ProjectStructure,
): ProjectStructure {
  const domainEntitiesKeys = getColumnsByType(
    data.columns,
    TableEntities.GEO_CATEGORY,
  ).filter((column) => column.visible && column.visible.calculation);

  const calculationParametersKeys = getColumnsByType(
    data.columns,
    TableEntities.CALC_PARAM,
  );

  const rows = data.rows.filter((row) =>
    domainEntitiesKeys.every(({ key }) => row[key]),
  );

  const domainObjects = rows
    .filter((row) => domainEntitiesKeys.some(({ key }) => row[key]?.value))
    .map((row) => ({
      domainObjectPath: domainEntitiesKeys.map(({ key }) =>
        String(row[key]?.value || ''),
      ),
      risksValues: [0.7, 0.7],
      geoObjectCategory: 'RESERVES',
      attributeValues: calculationParametersKeys.map(
        ({ key }) => row[key]?.args,
      ),
    }));

  const domainEntities = domainEntitiesKeys.map(({ name, type }) => ({
    name,
    icon: CategoryIcon.FORMATION_ICON,
    __typename: type,
  }));

  const calculationParameters = calculationParametersKeys.map(
    ({ key }) =>
      ({
        ...template.calculationParameters.find(({ code }) => code === key),
      } as CalculationParam),
  );

  const risks: Risk[] = [];

  return {
    domainEntities,
    calculationParameters,
    risks,
    domainObjects,
  };
}
