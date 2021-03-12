import { GridColumn, GridRow, TableEntities } from 'components/ExcelTable';
import { filter, flow, map, some } from 'lodash/fp';

export const rowIsFulfilled = (
  row: GridRow,
  columns: GridColumn[],
  tableEntity: TableEntities = TableEntities.GEO_CATEGORY,
): boolean =>
  flow(
    filter(({ type }) => type === tableEntity),
    map(({ key, name }: GridColumn) => ({
      key,
      name,
    })),
    some(({ key }: { key: string }) => Boolean(row[key]?.value)),
  )(columns);
