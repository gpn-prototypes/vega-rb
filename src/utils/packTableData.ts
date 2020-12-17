import { OptionEntity } from 'components/ExcelTable/Models/OptionEntity';
import {
  GridCollection,
  GridColumn,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';
import {
  AttributeInput,
  AttributeValueInput,
  DistributionInput,
  DomainObjectInput,
  GeoObjectCategories,
  Maybe,
  ProjectStructureInput,
  RbDomainEntityIcons,
  RbDomainEntityInput,
  RiskInput,
} from 'generated/graphql';
import { defaultTo, isEmpty, omitAll, toNumber } from 'lodash/fp';
import { SpecialColumns } from 'model/Table';
import { isEmpty as isEmptyUtil } from 'utils/isEmpty';

import { getColumnsByType } from './getColumnsByType';

const removeCommas = (str: string) => str.split(',').filter(Boolean).join(',');

const omitTypename = omitAll('__typename');

function getGeoObjectCategoryParamsFromOption(option?: OptionEntity) {
  if (option) {
    return option.toString() === 'resource'
      ? GeoObjectCategories.Resources
      : GeoObjectCategories.Reserves;
  }
  return GeoObjectCategories.Reserves;
}

type DomainObjectsProps = {
  rows: GridRow[];
  risks: GridColumn[];
  calculationParams: GridColumn[];
  domainEntities: GridColumn[];
};

function assembleDomainObjects({
  rows: commonRows,
  risks: riskColumns,
  calculationParams: calculationParametersColumns,
  domainEntities: domainEntitiesColumns,
}: DomainObjectsProps): Array<DomainObjectInput> {
  const rows = commonRows.filter(
    (row) =>
      domainEntitiesColumns.some(({ key }) => row[key]) ||
      riskColumns.some(({ key }) => row[key]) ||
      calculationParametersColumns.some(({ key }) => row[key]),
  );

  const collectAttributeValues = (
    row: GridRow,
  ): Array<Maybe<AttributeValueInput>> => {
    return calculationParametersColumns.map(({ key }: GridColumn) => {
      const distributionValues = row[key]?.args;
      const parameters = defaultTo(
        [],
        distributionValues?.parameters?.map((parameter) =>
          omitTypename(parameter),
        ),
      );

      return !isEmpty(distributionValues)
        ? {
            distribution: {
              ...distributionValues,
              parameters,
            } as DistributionInput,
          }
        : null;
    });
  };

  return rows.map((row) => ({
    visible: true,
    domainObjectPath: domainEntitiesColumns.map(({ key }) =>
      String(row[key]?.value || ''),
    ),
    risksValues: riskColumns.map(({ key }) => {
      return !isEmptyUtil(row[key]?.value) ? toNumber(row[key]?.value) : null;
    }),
    geoObjectCategory: getGeoObjectCategoryParamsFromOption(
      row[SpecialColumns.GEO_CATEGORY]?.value as OptionEntity,
    ),
    attributeValues: collectAttributeValues(row),
  }));
}

function assembleRisks(columns: GridColumn[]): Array<RiskInput> {
  return columns.map(({ key, name }) => ({
    code: key,
    name,
  }));
}

function assembleDomainEntities(
  columns: GridColumn[],
): Array<RbDomainEntityInput> {
  return columns.map(({ name, key }) => ({
    name,
    icon: RbDomainEntityIcons.FormationIcon,
    code: key,
    visible: {
      tree: true,
      table: true,
      calc: true,
    },
  }));
}

function assembleAttributes(
  columns: GridColumn[],
  tableTemplate: ProjectStructureInput,
): Array<AttributeInput> {
  return columns.map(({ key, name }) => {
    const attribute = tableTemplate.attributes.find(({ code }) => code === key);
    const nameWithoutCommas = removeCommas(name);

    return omitTypename(
      defaultTo(
        {
          code: key,
          name: nameWithoutCommas,
          shortName: nameWithoutCommas,
          units: '',
        },
        attribute,
      ),
    ) as AttributeInput;
  });
}

export function packTableData(
  data: GridCollection,
  tableTemplate: ProjectStructureInput,
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

  return {
    attributes: assembleAttributes(calculationParametersColumns, tableTemplate),
    domainEntities: assembleDomainEntities(domainEntitiesColumns),
    domainObjects: assembleDomainObjects({
      rows: data.rows,
      risks: riskColumns,
      calculationParams: calculationParametersColumns,
      domainEntities: domainEntitiesColumns,
    }),
    risks: assembleRisks(riskColumns),
  };
}
