import { GridCollection, TableEntities } from 'components/ExcelTable/types';
import {
  Distribution,
  GeoObjectCategories,
  Maybe,
  ProjectStructureInput,
  RbDomainEntityIcons,
} from 'generated/graphql';
import { CalculationParam, Risk } from 'types';

import { getColumnsByType } from './getColumnsByType';

export function packTableData(
  data: GridCollection,
  template: ProjectStructureInput,
): ProjectStructureInput {
  const domainEntitiesColumns = getColumnsByType(
    data.columns,
    TableEntities.GEO_CATEGORY,
  );

  const calculationParametersColumns = getColumnsByType(
    data.columns,
    TableEntities.CALC_PARAM,
  );

  const riskColumns = getColumnsByType(data.columns, TableEntities.RISK);

  const risks: Risk[] = riskColumns.map(({ key, name }) => ({
    code: key,
    name,
  }));
  const rows = data.rows.filter((row) =>
    domainEntitiesColumns.every(({ key }) => key && row[key]),
  );

  const domainObjects = rows
    .filter((row) =>
      domainEntitiesColumns.some(({ key }) => key && row[key]?.value),
    )
    .map((row) => ({
      visible: true,
      domainObjectPath: domainEntitiesColumns.map(({ key }) =>
        String(row[key]?.value || ''),
      ),
      risksValues: riskColumns.map(
        ({ key }) => (row[key]?.value as number) ?? null,
      ),
      geoObjectCategory: GeoObjectCategories.Reserves,
      attributeValues: calculationParametersColumns.map(
        ({ key }) => row[key]?.args as Maybe<Distribution>,
      ),
    }));
  const domainEntities = domainEntitiesColumns.map(({ name, type, key }) => ({
    name,
    icon: RbDomainEntityIcons.FormationIcon,
    code: key,
    visible: {
      tree: true,
      table: true,
      calc: true,
    },
  }));

  const calculationParameters = calculationParametersColumns.map(
    ({ key }) =>
      ({
        ...template.attributes.find(({ code }) => code === key),
      } as CalculationParam),
  );

  return {
    domainEntities,
    attributes: calculationParameters.map(
      ({ __typename, ...params }) => params,
    ),
    risks,
    domainObjects,
  };
}
