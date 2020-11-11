import { GridCollection, TableEntities } from 'components/ExcelTable/types';
import {
  Distribution,
  GeoObjectCategories,
  Maybe,
  ProjectStructureInput,
  RbDomainEntityIcons,
} from 'generated/graphql';
import { CalculationParam, ProjectStructure, Risk } from 'types';

import { getColumnsByType } from './getColumnsByType';

export function packTableData(
  data: GridCollection,
  template: ProjectStructure,
): ProjectStructureInput {
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

  const domainObjects = rows
    .filter((row) => domainEntitiesKeys.some(({ key }) => row[key]?.value))
    .map((row) => ({
      visible: true,
      domainObjectPath: domainEntitiesKeys.map(({ key }) =>
        String(row[key]?.value || ''),
      ),
      risksValues: [0.7, 0.7],
      geoObjectCategory: GeoObjectCategories.Reserves,
      attributeValues: calculationParametersKeys.map(
        ({ key }) => row[key]?.args as Maybe<Distribution>,
      ),
    }));

  const domainEntities = domainEntitiesKeys.map(({ name, type }) => ({
    name,
    icon: RbDomainEntityIcons.FormationIcon,
    visible: {
      tree: true,
      table: true,
      calc: true,
    },
  }));

  const calculationParameters = calculationParametersKeys.map(
    ({ key }) =>
      ({
        ...template.calculationParameters.find(({ code }) => code === key),
      } as CalculationParam),
  );

  const risks: Risk[] = [
    { code: 'PARENT_MATERIAL', name: 'Мат. порода' },
    { code: 'MIGRATION', name: 'Миграция' },
  ];

  return {
    domainEntities,
    attributes: calculationParameters.map(
      ({ __typename, ...params }) => params,
    ),
    risks,
    domainObjects,
  };
}
