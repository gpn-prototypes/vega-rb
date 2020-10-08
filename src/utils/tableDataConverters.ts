import GridColumnEntity from 'components/ExcelTable/Models/GridColumnEntity';
import {
  CategoryIcon,
  GridCollection,
  GridColumn,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';
import { CATEGORIES_TYPES, SpecialColumns } from 'model/Table';
import {
  CalculationParam,
  GeoCategory,
  IProjectStructure,
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

export function unpackData({
  domainEntities = [],
  calculationParameters = [],
  risks = [],
  domainObjects: cellsData = [],
}: IProjectStructure): GridCollection {
  const columns: GridColumn[] = [
    new GridColumnEntity(SpecialColumns.ID, undefined, TableEntities.ID),
    ...structureParamsReducer(domainEntities),
    new GridColumnEntity(
      SpecialColumns.SPLITTER,
      undefined,
      TableEntities.SPLITTER,
    ),
    ...structureParamsReducer(calculationParameters),
    new GridColumnEntity(
      SpecialColumns.SPLITTER_RISKS,
      undefined,
      TableEntities.SPLITTER,
    ),
    ...structureParamsReducer(risks),
  ];

  const rows = [
    ...cellsData.map(({ domainObjectPath }, idx) => ({
      ...convertCellsDataToGridRow(domainObjectPath, domainEntities),
      id: { value: idx },
    })),
    ...Array.from({ length: 1000 - cellsData.length }, (val, index) => ({
      id: { value: index },
    })),
  ];

  return {
    columns,
    rows,
  };
}

export function packData(
  data: GridCollection,
  template: IProjectStructure,
): IProjectStructure {
  const domainEntitiesKeys = data.columns.filter(
    (col) => col.type === TableEntities.GEO_CATEGORY,
  );
  const calculationParametersKeys = data.columns.filter(
    (col) => col.type === TableEntities.CALC_PARAM,
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
