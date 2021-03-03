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

  const attributeColumns = getColumnsByType(
    data.columns,
    TableEntities.CALC_PARAM,
  );

  const riskColumns = getColumnsByType(data.columns, TableEntities.RISK);

  return {
    domainObjects: assembleDomainObjects({
      rows: data.rows,
      riskColumns,
      attributeColumns,
      domainEntitiesColumns,
    }),
    attributes: assembleAttributes(attributeColumns, tableTemplate),
    domainEntities: assembleDomainEntities(domainEntitiesColumns),
    risks: assembleRisks(riskColumns),
  };
}
