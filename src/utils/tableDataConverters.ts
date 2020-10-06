import GridColumn from 'components/ExcelTable/Models/GridColumn';
import {
  CategoryIcon,
  GridCollection,
  GridRow,
  IGridColumn,
  TableEntities,
} from 'components/ExcelTable/types';
import { Risk } from 'generated/graphql';
import { CATEGORIES_TYPES, SpecialColumns } from 'model/Table';
import { CalculationParam, GeoCategory, IProjectStructure } from 'types';

const getCalculationColumn = (
  prev: IGridColumn[],
  { code, shortName, units }: CalculationParam,
): IGridColumn[] => [
  ...prev,
  {
    key: code,
    name: `${shortName}, ${units}`,
    type: TableEntities.CALC_PARAM,
  } as IGridColumn,
];

const getCategoryColumn = (
  prev: IGridColumn[],
  { name }: GeoCategory,
): IGridColumn[] => [
  ...prev,
  {
    key: CATEGORIES_TYPES.get(name),
    name,
    type: TableEntities.GEO_CATEGORY,
  } as IGridColumn,
];

function structureParamsReducer<T extends CalculationParam | GeoCategory>(
  list: T[],
): IGridColumn[] {
  if (!list.length) return [];

  return list.reduce((prev: IGridColumn[], curr: T) => {
    switch (curr.__typename) {
      case TableEntities.CALC_PARAM:
        return getCalculationColumn(prev, curr as CalculationParam);

      case TableEntities.GEO_CATEGORY:
        if (CATEGORIES_TYPES.has(curr.name)) {
          return getCategoryColumn(prev, curr as GeoCategory);
        }
        return prev;

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
  domainObjects: cellsData = [],
}: IProjectStructure): GridCollection {
  const columns: IGridColumn[] = [
    new GridColumn(SpecialColumns.ID),
    ...structureParamsReducer<GeoCategory>(domainEntities),
    new GridColumn(SpecialColumns.SPLITTER),
    ...structureParamsReducer<CalculationParam>(calculationParameters),
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
      domainObjectPath: domainEntitiesKeys.map<string>(({ key }) => {
        return row[key]?.value ? String(`domainObject ${row[key]?.value}`) : '';
      }),
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
    domainObjects,
    risks,
  };
}
