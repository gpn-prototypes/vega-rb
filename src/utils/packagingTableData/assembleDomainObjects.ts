import { ReactText } from 'react';
import { isNumeric } from 'components/DistributionSettings/helpers';
import { GridColumn, GridRow } from 'components/ExcelTable/types';
import { entitiesOptions } from 'components/ExcelTable/utils/getEditor';
import {
  AttributeValueInput,
  DistributionInput,
  DomainObjectInput,
  DomainObjectPathLevelInput,
  RiskValueInput,
} from 'generated/graphql';
import {
  dropRightWhile,
  flow,
  getOr,
  isNull,
  map,
  toNumber,
  toString,
} from 'lodash/fp';
import { SpecialColumns } from 'model/Table';
import { DomainObjectsProps, IData, NoopFunction, Nullable } from 'types';
import { isEmpty } from 'utils/isEmpty';
import { omitTypename } from 'utils/omitTypename';

function trimEmptyRows(
  rows: GridRow[],
  validateValue: (row: GridRow) => boolean,
): GridRow[] {
  return dropRightWhile((row) => !validateValue(row), rows);
}

function getDistribution(
  key: string,
  row: GridRow,
): Nullable<DistributionInput> {
  const distributionValues = getOr(null, [key, 'args'], row);
  const getParameters = flow(
    (object) => getOr([], [key, 'args', 'parameters'], object),
    map(omitTypename),
  );

  if (distributionValues != null) {
    return {
      ...distributionValues,
      parameters: getParameters(row),
    };
  }

  return null;
}

function collectValuesWithAttributes(
  row: GridRow,
  columnsList: GridColumn[],
): AttributeValueInput[] {
  return columnsList.map(({ key }) => {
    return {
      code: key,
      distribution: getDistribution(key, row),
    };
  });
}

function collectValues<T>(
  row: GridRow,
  columns: GridColumn[],
  getValue: NoopFunction<Nullable<ReactText>, Nullable<T>>,
): IData<T>[] {
  return columns.map(({ key }) => ({
    code: key,
    value: getValue(getOr(null, [key, 'value'], row)),
  }));
}

export function collectRisks(
  row: GridRow,
  columns: GridColumn[],
): RiskValueInput[] {
  return collectValues<number>(row, columns, (value) => {
    return !isNull(value) && isNumeric(value) ? toNumber(value) : null;
  });
}

export function collectDomainObjects(
  row: GridRow,
  columns: GridColumn[],
): DomainObjectPathLevelInput[] {
  return collectValues<string>(row, columns, (value) => {
    return isEmpty(value) ? null : toString(value);
  });
}

export default function assembleDomainObjects({
  rows: commonRows,
  riskColumns,
  attributeColumns,
  domainEntitiesColumns,
}: DomainObjectsProps): Array<DomainObjectInput> {
  const validateValue = (row: GridRow) =>
    domainEntitiesColumns.some(({ key }) => row[key]) ||
    riskColumns.some(({ key }) => row[key]) ||
    attributeColumns.some(({ key }) => row[key]);

  const rows = trimEmptyRows(commonRows, validateValue);

  return rows.map((row) => ({
    visible: true,
    domainObjectPath: collectDomainObjects(row, domainEntitiesColumns),
    geoObjectCategory: getOr(
      entitiesOptions.RESOURCE.value,
      [SpecialColumns.GEO_CATEGORY, 'value'],
      row,
    ),
    attributeValues: collectValuesWithAttributes(row, attributeColumns),
    risksValues: collectRisks(row, riskColumns),
  }));
}
