import { ReactText } from 'react';
import { OptionEntity } from 'components/ExcelTable/Models/OptionEntity';
import {
  DropdownOption,
  GridColumn,
  GridRow,
} from 'components/ExcelTable/types';
import {
  AttributeValueInput,
  DistributionInput,
  DomainObjectInput,
  GeoObjectCategories,
  Maybe,
} from 'generated/graphql';
import { defaultTo, isEmpty, toNumber } from 'lodash/fp';
import { SpecialColumns } from 'model/Table';
import { isEmpty as isEmptyUtil } from 'utils/isEmpty';
import { omitTypename } from 'utils/omitByTypename';

type DomainObjectsProps = {
  rows: GridRow[];
  risks: GridColumn[];
  calculationParams: GridColumn[];
  domainEntities: GridColumn[];
};

function getGeoObjectCategory(option?: ReactText | DropdownOption) {
  return (option as OptionEntity)?.id ?? GeoObjectCategories.Reserves;
}

export default function assembleDomainObjects({
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
    geoObjectCategory: getGeoObjectCategory(
      row[SpecialColumns.GEO_CATEGORY]?.value,
    ),
    attributeValues: collectAttributeValues(row),
  }));
}
