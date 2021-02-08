import GridColumnEntity from 'components/ExcelTable/Models/GridColumnEntity';
import { GridColumn, TableEntities } from 'components/ExcelTable/types';
import { v4 as uuid } from 'uuid';

export const columnsListMock: GridColumn[] = [
  new GridColumnEntity(uuid(), 'MockedColumn', TableEntities.CALC_PARAM),
  new GridColumnEntity(uuid(), 'MockedColumn', TableEntities.CALC_PARAM),
  new GridColumnEntity(uuid(), 'MockedColumn', TableEntities.CALC_PARAM),
  new GridColumnEntity(uuid(), 'RenamedColumn', TableEntities.CALC_PARAM),
  new GridColumnEntity(
    uuid(),
    'MockedColumnCategory',
    TableEntities.GEO_CATEGORY,
  ),
  new GridColumnEntity(uuid(), 'MockedColumnRisk', TableEntities.RISK),
  new GridColumnEntity(uuid(), 'MockedColumnRisk', TableEntities.RISK),
  new GridColumnEntity(uuid(), 'MockedColumnRisk_1', TableEntities.RISK),
  new GridColumnEntity(uuid(), 'MockedColumnRisk_2', TableEntities.RISK),
  new GridColumnEntity(
    uuid(),
    'MockedColumnCategory_1',
    TableEntities.GEO_CATEGORY,
  ),
];
