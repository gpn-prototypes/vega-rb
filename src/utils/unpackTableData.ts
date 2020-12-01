import GridColumnEntity from 'components/ExcelTable/Models/GridColumnEntity';
import {
  GridCollection,
  GridColumn,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';
import { options } from 'components/ExcelTable/utils/getEditor';
import {
  AttributeInput,
  DistributionInput,
  DistributionParameter,
  GeoObjectCategories,
  Maybe,
  ProjectStructureInput,
  RbDomainEntityInput,
  RiskInput,
} from 'generated/graphql';
import { omit } from 'lodash';
import { SpecialColumns } from 'model/Table';
import { CalculationParam, GeoCategory, Risk, TableStructures } from 'types';

type TableDistributionResultList = Array<null | number>[];

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
  { code, name }: GeoCategory,
): GridColumn[] => [
  ...prev,
  new GridColumnEntity(code, name, TableEntities.GEO_CATEGORY),
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
const prepareCalculationParamsToGridRow = (
  attributes: AttributeInput[],
  attributesValues: Array<Maybe<DistributionInput>>,
  calculationResultList?: Array<number | null>,
) => {
  return attributes
    .map(({ code }) => code)
    .reduce((prev, key, idx) => {
      return {
        ...prev,
        [key]: {
          value: calculationResultList?.[idx],
          args: attributesValues[idx]
            ? {
                ...omit(attributesValues[idx], '__typename'),
                parameters: (attributesValues[idx]
                  ?.parameters as DistributionParameter[]).map(
                  ({ __typename, ...parameter }) => parameter,
                ),
              }
            : attributesValues[idx],
        },
      };
    }, {});
};

function prepareRiskParamsToGridRow(
  riskValues: Array<number | null>,
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

function prepareDomainEntityParamsToGridRow(
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
    id: {
      value: count === 1000 ? index + 1 : Math.abs(count - 1000 - index - 1),
    },
  }));
}

function getGeoObjectCategoryCellValue(category?: GeoObjectCategories) {
  if (category) {
    return category === GeoObjectCategories.Reserves
      ? options.reef
      : options.resource;
  }
  return options.reef;
}

function constructRows(
  {
    domainEntities = [],
    domainObjects = [],
    attributes = [],
    risks = [],
  }: ProjectStructureInput,
  calculationResultList?: TableDistributionResultList,
): GridRow[] {
  const emptyRowsLength = 1000 - domainObjects.length;

  return [
    ...domainObjects.map(
      (
        { domainObjectPath, geoObjectCategory, attributeValues, risksValues },
        idx,
      ) => ({
        ...prepareDomainEntityParamsToGridRow(domainObjectPath, domainEntities),
        ...prepareCalculationParamsToGridRow(
          attributes,
          attributeValues,
          calculationResultList?.[idx],
        ),
        ...prepareRiskParamsToGridRow(risksValues, risks),
        id: { value: idx + 1 },
        [SpecialColumns.GEO_CATEGORY]: getGeoObjectCategoryCellValue(
          geoObjectCategory,
        ),
      }),
    ),
    ...createEmptyRows(emptyRowsLength),
  ];
}

export function unpackTableData(
  projectStructure: ProjectStructureInput,
  version: number,
  calculationResultList?: TableDistributionResultList,
): GridCollection {
  const columns: GridColumn[] = constructColumns(projectStructure);
  const rows: GridRow[] = constructRows(
    projectStructure,
    calculationResultList,
  );

  return {
    columns,
    rows,
    errors: [],
    version,
  };
}
