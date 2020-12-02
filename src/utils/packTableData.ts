import { OptionEntity } from 'components/ExcelTable/Models/OptionEntity';
import { GridCollection, TableEntities } from 'components/ExcelTable/types';
import {
  Distribution,
  GeoObjectCategories,
  Maybe,
  ProjectStructureInput,
  RbDomainEntityIcons,
} from 'generated/graphql';
import { defaultTo } from 'lodash';
import { toNumber } from 'lodash/fp';
import { SpecialColumns } from 'model/Table';
import { CalculationParam, Risk } from 'types';

import { getColumnsByType } from './getColumnsByType';

function getGeoObjectCategoryParamsFromOption(option?: OptionEntity) {
  if (option) {
    return option.toString() === 'resource'
      ? GeoObjectCategories.Resources
      : GeoObjectCategories.Reserves;
  }
  return GeoObjectCategories.Reserves;
}

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

  const rows = data.rows.filter(
    (row) =>
      domainEntitiesColumns.some(({ key }) => row[key]) ||
      riskColumns.some(({ key }) => row[key]) ||
      calculationParametersColumns.some(({ key }) => row[key]),
  );

  const domainObjects = rows.map((row) => ({
    visible: true,
    domainObjectPath: domainEntitiesColumns.map(({ key }) =>
      String(row[key]?.value || ''),
    ),
    risksValues: riskColumns.map(({ key }) => {
      return row[key]?.value !== '' ? toNumber(row[key]?.value) : null;
    }),
    geoObjectCategory: getGeoObjectCategoryParamsFromOption(
      row[SpecialColumns.GEO_CATEGORY]?.value as OptionEntity,
    ),
    attributeValues: calculationParametersColumns.map(
      ({ key }) => row[key]?.args as Maybe<Distribution>,
    ),
  }));

  const domainEntities = domainEntitiesColumns.map(({ name, key }) => ({
    name,
    icon: RbDomainEntityIcons.FormationIcon,
    code: key,
    visible: {
      tree: true,
      table: true,
      calc: true,
    },
  }));

  const removeCommas = (str: string) =>
    str.split(',').filter(Boolean).join(',');

  const calculationParameters = calculationParametersColumns.map(
    ({ key, name }) => {
      const el = template.attributes.find(({ code }) => code === key);
      const nameWithoutCommas = removeCommas(name);
      return defaultTo(el, {
        code: key,
        name: nameWithoutCommas,
        shortName: nameWithoutCommas,
        units: '',
      }) as CalculationParam;
    },
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
