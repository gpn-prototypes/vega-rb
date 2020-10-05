import {
  CategoryIcon,
  GridCollection,
  TableEntities,
} from 'components/ExcelTable/types';
import { CalculationParam, IProjectCell, IProjectStructure, Risk } from 'types';

import { getColumnsByType } from './getColumnsByType';

export function packTableData(
  data: GridCollection,
  template: IProjectStructure,
): IProjectStructure {
  const domainEntitiesKeys = getColumnsByType(
    data.columns,
    TableEntities.GEO_CATEGORY,
  );

  const calculationParametersKeys = getColumnsByType(
    data.columns,
    TableEntities.CALC_PARAM,
  );

  const rows = data.rows.filter((row) =>
    domainEntitiesKeys.every(({ key }) => row[key]),
  );

  const domainObjects = rows.map<IProjectCell>((row) => ({
    cells: domainEntitiesKeys.map<string>(({ key }) => String(row[key]?.value)),
    geoObjectCategory: 'RESERVES',
    attributeValues: calculationParametersKeys
      .filter(({ key }) => row[key])
      .map(({ key }) => row[key]?.args),
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
