import GridColumnEntity from 'components/ExcelTable/Models/GridColumnEntity';
import {
  GridCellArguments,
  GridCollection,
  GridColumn,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';
import { entitiesOptions } from 'components/ExcelTable/utils/getEditor';
import {
  Attribute,
  AttributeValue,
  GeoObjectCategories,
  Maybe,
  ProjectStructure,
  ProjectStructureInput,
  RbDomainEntityInput,
  RiskInput,
  VisibleInput,
} from 'generated/graphql';
import { SpecialColumns } from 'model/Table';
import { CalculationParam, GeoCategory, Risk, TableStructures } from 'types';

import { omitTypename } from './omitTypename';

const getCalculationColumn = (
  prev: GridColumn[],
  { code, shortName, units }: CalculationParam,
): GridColumn[] => [
  ...prev,
  new GridColumnEntity(
    code,
    units.trim().length ? `${shortName}, ${units}` : shortName,
    TableEntities.CALC_PARAM,
  ),
];

const getCategoryColumn = (
  prev: GridColumn[],
  { code, name, visible }: GeoCategory,
): GridColumn[] => [
  ...prev,
  new GridColumnEntity(
    code,
    name,
    TableEntities.GEO_CATEGORY,
    omitTypename(visible) as VisibleInput,
  ),
];

const getRiskColumn = (
  prev: GridColumn[],
  { code, name }: Risk,
): GridColumn[] => {
  return [...prev, new GridColumnEntity(code, name, TableEntities.RISK)];
};

function structureParamsReducer(list: TableStructures[]): GridColumn[] {
  if (!list.length) return [];

  return list.reduce((prev: GridColumn[], curr: TableStructures) => {
    switch (curr.__typename) {
      case TableEntities.CALC_PARAM:
        return getCalculationColumn(prev, curr as CalculationParam);

      case TableEntities.GEO_CATEGORY:
        return getCategoryColumn(prev, curr as GeoCategory);

      case TableEntities.RISK:
        return getRiskColumn(prev, curr as Risk);

      default:
        return prev;
    }
  }, []);
}

function collectAttributeValues(
  attributes: Array<Attribute>,
  attributesValues: Array<Maybe<AttributeValue>>,
): GridRow {
  const getArguments = (
    attributeValue: Maybe<AttributeValue>,
  ): GridCellArguments => {
    if (attributeValue) {
      return omitTypename(attributeValue.distribution) as GridCellArguments;
    }

    return {} as GridCellArguments;
  };

  return attributes
    .map(({ code }) => code)
    .reduce((prev, key, idx) => {
      const attributeValue = attributesValues[idx];

      return {
        ...prev,
        [key]: {
          value: attributeValue?.visibleValue,
          args: getArguments(attributeValue),
        },
      };
    }, {});
}

function collectRisks(
  riskValues: Array<Maybe<number>>,
  risk: RiskInput[],
): GridRow {
  return risk
    .map(({ code }) => code)
    .reduce(
      (prev, name, idx) => ({
        ...prev,
        [name]: {
          value: riskValues[idx],
        },
      }),
      {},
    );
}

function collectDomainEntities(
  cells: string[],
  domainEntities: RbDomainEntityInput[],
): GridRow {
  return domainEntities
    .map(({ code }) => code)
    .reduce(
      (prev, name, idx) => ({
        ...prev,
        [name]: {
          value: cells[idx],
        },
      }),
      {},
    );
}

function constructColumns({
  domainEntities = [],
  attributes = [],
  risks = [],
}: ProjectStructureInput): GridColumn[] {
  return [
    new GridColumnEntity(SpecialColumns.ID, undefined, TableEntities.ID),
    ...structureParamsReducer(domainEntities),
    new GridColumnEntity(
      SpecialColumns.GEO_CATEGORY,
      'Кат.',
      TableEntities.GEO_CATEGORY_TYPE,
    ),
    new GridColumnEntity(
      SpecialColumns.SPLITTER,
      undefined,
      TableEntities.SPLITTER,
    ),
    ...structureParamsReducer(attributes),
    new GridColumnEntity(
      SpecialColumns.SPLITTER_RISKS,
      undefined,
      TableEntities.SPLITTER,
    ),
    ...structureParamsReducer(risks),
  ];
}

function generateEmptyRows(count: number): Array<GridRow> {
  const getOrderNumber = (index: number) => {
    return count === 1000 ? index + 1 : Math.abs(count - 1000 - index - 1);
  };

  return Array.from({ length: count }, (val, index) => ({
    id: {
      value: getOrderNumber(index),
    },
  }));
}

function getGeoObjectCategoryValue(category: GeoObjectCategories) {
  return category === GeoObjectCategories.Resources
    ? entitiesOptions.RESOURCE
    : entitiesOptions.RESERVES;
}

function constructRows({
  domainEntities = [],
  domainObjects = [],
  attributes = [],
  risks: risksEntities = [],
}: ProjectStructure): GridRow[] {
  const rowsCount = 1000 - domainObjects.length;

  return [
    ...domainObjects.map(
      (
        { domainObjectPath, geoObjectCategory, attributeValues, risksValues },
        idx,
      ) => {
        const geoObjectCategoryValue = getGeoObjectCategoryValue(
          geoObjectCategory,
        );
        const domainEntitiesList = collectDomainEntities(
          domainObjectPath,
          domainEntities,
        );
        const attributeValuesList = collectAttributeValues(
          attributes,
          attributeValues,
        );
        const risksList = collectRisks(risksValues, risksEntities);

        return {
          id: { value: idx + 1 },
          [SpecialColumns.GEO_CATEGORY]: geoObjectCategoryValue,
          ...domainEntitiesList,
          ...attributeValuesList,
          ...risksList,
        };
      },
    ),
    ...generateEmptyRows(rowsCount),
  ];
}

export function unpackTableData(
  projectStructure: ProjectStructure,
  version: number,
): GridCollection {
  const columns: GridColumn[] = constructColumns(projectStructure);
  const rows: GridRow[] = constructRows(projectStructure);

  return {
    columns,
    rows,
    errors: {},
    version,
  };
}
