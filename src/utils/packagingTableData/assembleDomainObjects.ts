import {
  DropDownOption,
  GridColumn,
  GridRow,
} from 'components/ExcelTable/types';
import { entitiesOptions } from 'components/ExcelTable/utils/getEditor';
import {
  AttributeValueInput,
  DistributionInput,
  DomainObjectInput,
  GeoObjectCategories,
  Maybe,
} from 'generated/graphql';
import { defaultTo, dropRightWhile, isEmpty, toNumber } from 'lodash/fp';
import { SpecialColumns } from 'model/Table';
import { DomainObjectsProps } from 'types';
import { isEmpty as isEmptyUtil } from 'utils/isEmpty';
import { omitTypename } from 'utils/omitTypename';

function getGeoObjectCategory(option: DropDownOption): GeoObjectCategories {
  return option?.value ?? entitiesOptions.RESOURCE.value;
}

function trimEmptyRows(
  rows: GridRow[],
  validateValue: (row: GridRow) => boolean,
): GridRow[] {
  return dropRightWhile((row) => !validateValue(row), rows);
}

function collectAttributeValues(
  row: GridRow,
  calculationParametersColumns: GridColumn[],
): Array<Maybe<AttributeValueInput>> {
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
}

export default function assembleDomainObjects({
  rows: commonRows,
  risks: riskColumns,
  calculationParams: attributesColumns,
  domainEntities: domainEntitiesColumns,
}: DomainObjectsProps): Array<DomainObjectInput> {
  const validateValue = (row: GridRow) =>
    domainEntitiesColumns.some(({ key }) => row[key]) ||
    riskColumns.some(({ key }) => row[key]) ||
    attributesColumns.some(({ key }) => row[key]);

  const rows = trimEmptyRows(commonRows, validateValue);

  return rows.map((row) => ({
    visible: true,
    domainObjectPath: domainEntitiesColumns.map(({ key }) =>
      String(row[key]?.value || ''),
    ),
    risksValues: riskColumns.map(({ key }) => {
      return !isEmptyUtil(row[key]?.value) ? toNumber(row[key]?.value) : null;
    }),
    geoObjectCategory: getGeoObjectCategory(
      row[SpecialColumns.GEO_CATEGORY] as DropDownOption,
    ),
    attributeValues: collectAttributeValues(row, attributesColumns),
  }));
}
