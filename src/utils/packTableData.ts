import { TableEntities } from 'components/ExcelTable/enums';
import { GridCollection } from 'components/ExcelTable/types';
import { ProjectStructureInput } from 'generated/graphql';
import {
  assembleAttributes,
  assembleDomainEntities,
  assembleDomainObjects,
  assembleRisks,
} from 'utils/packagingTableData';

import { getColumnsByType } from './getColumnsByType';

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

  const risksColumns = getColumnsByType(data.columns, TableEntities.RISK);

  return {
    attributes: assembleAttributes(calculationParametersColumns, tableTemplate),
    domainEntities: assembleDomainEntities(domainEntitiesColumns),
    domainObjects: assembleDomainObjects({
      rows: data.rows,
      risks: risksColumns,
      calculationParams: calculationParametersColumns,
      domainEntities: domainEntitiesColumns,
    }),
    risks: assembleRisks(risksColumns),
  };
}
