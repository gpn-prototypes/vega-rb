import GridColumnEntity from 'components/ExcelTable/Models/GridColumnEntity';
import {
  GridCollection,
  GridColumn,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';
import {
  AttributeInput,
  DistributionInput,
  GeoObjectCategories,
  Maybe,
  ProjectStructureInput,
} from 'generated/graphql';
import { CATEGORIES_TYPES, SpecialColumns } from 'model/Table';
import { CalculationParam, GeoCategory, Risk, TableStructures } from 'types';

const getCalculationColumn = (
  prev: GridColumn[],
  { code, shortName, units }: CalculationParam,
): GridColumn[] => [
  ...prev,
  new GridColumnEntity(
    code,
    `${shortName}, ${units}`,
    TableEntities.CALC_PARAM,
  ),
];

const getCategoryColumn = (
  prev: GridColumn[],
  { name }: GeoCategory,
): GridColumn[] => [
  ...prev,
  new GridColumnEntity(
    CATEGORIES_TYPES.get(name)!,
    name,
    TableEntities.GEO_CATEGORY,
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
        if (CATEGORIES_TYPES.has(curr.name)) {
          return getCategoryColumn(prev, curr as GeoCategory);
        }
        return prev;

      case TableEntities.RISK:
        return getRiskColumn(prev, curr as Risk);

      default:
        return prev;
    }
  }, []);
}
const prepareCalculationParamsToGridRow = (
  attributes: AttributeInput[],
  attributesValues: Array<Maybe<DistributionInput>>,
  calculationResultList?: number[],
) => {
  return attributes
    .map(({ name }) => name)
    .reduce((prev, name, idx) => {
      return {
        ...prev,
        [name]: {
          value: 'none',
          args: attributesValues[idx],
        },
      };
    }, {});
};

function convertCellsDataToGridRow(
  cells: string[],
  domainEntities: GeoCategory[],
): GridRow {
  return domainEntities
    .map(({ name }) => CATEGORIES_TYPES.get(name)!)
    .reduce(
      (prev, name, idx) => ({
        ...prev,
        [name]: {
          value: cells[idx],
        },
      }),
      {},
    ) as GridRow;
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

function createEmptyRows(count: number): Array<GridRow> {
  return Array.from({ length: count }, (val, index) => ({
    id: { value: count === 1000 ? index : index + 1 },
  }));
}

function getGeoObjectCategoryCellValue(category?: GeoObjectCategories) {
  if (!category) {
    return {
      value: '',
    };
  }
  return {
    value: category,
    text: category === GeoObjectCategories.Reserves ? 'Р' : 'З',
  };
}

function constructRows(
  {
    domainEntities = [],
    domainObjects = [],
    attributes = [],
  }: ProjectStructureInput,
  calculationResultList?: number[][],
): GridRow[] {
  const emptyRowsLength =
    1000 -
    domainObjects[0].domainObjectPath.length -
    domainObjects[0].attributeValues.length;
  return [
    ...domainObjects.map(({ domainObjectPath, geoObjectCategory }, idx) => ({
      ...convertCellsDataToGridRow(domainObjectPath, domainEntities),
      [SpecialColumns.GEO_CATEGORY]: getGeoObjectCategoryCellValue(
        geoObjectCategory,
      ),
      id: { value: idx },
    })),
    ...domainObjects.map(({ attributeValues }, idx) => ({
      ...prepareCalculationParamsToGridRow(
        attributes,
        attributeValues,
        calculationResultList?.[idx],
      ),
      id: { value: idx },
    })),
    ...createEmptyRows(1000 - emptyRowsLength),
  ];
}

export function unpackTableData(
  projectStructure: ProjectStructureInput,
  version: number,
  calculationResultList?: number[][],
): GridCollection & { version: number } {
  const columns: GridColumn[] = constructColumns(projectStructure);
  const rows: GridRow[] = constructRows(
    projectStructure,
    calculationResultList,
  );

  return {
    columns,
    rows,
    version,
  };
}
