import GridColumnEntity from 'components/ExcelTable/Models/GridColumnEntity';
import {
  GridCollection,
  GridColumn,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';
import { CATEGORIES_TYPES, SpecialColumns } from 'model/Table';
import {
  CalculationParam,
  GeoCategory,
  ProjectStructure,
  Risk,
  TableStructures,
} from 'types';

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
  calculationParameters = [],
  risks = [],
}: ProjectStructure): GridCollection[] {
  return [
    new GridColumn(SpecialColumns.ID, undefined, TableEntities.ID),
    ...structureParamsReducer(domainEntities),
    new GridColumn(SpecialColumns.SPLITTER, undefined, TableEntities.SPLITTER),
    ...structureParamsReducer(calculationParameters),
    new GridColumn(
      SpecialColumns.SPLITTER_RISKS,
      undefined,
      TableEntities.SPLITTER,
    ),
    ...structureParamsReducer(risks),
  ];
}

function getEmptyRows(count: number) {
  return Array.from({ length: count }, (val, index) => ({
    id: { value: index },
  }));
}

function constructRows({
  domainEntities = [],
  domainObjects: cellsData = [],
}: ProjectStructure): GridRow[] {
  return [
    ...cellsData.map(({ domainObjectPath }, idx) => ({
      ...convertCellsDataToGridRow(domainObjectPath, domainEntities),
      id: { value: idx },
    })),
    ...getEmptyRows(1000 - cellsData.length),
  ];
}

export function unpackTableData(
  projectStructure: ProjectStructure,
): GridCollection {
  const columns: GridColumn[] = constructColumns(projectStructure);
  const rows: GridRow[] = constructRows(projectStructure);

  return {
    columns,
    rows,
  };
}
