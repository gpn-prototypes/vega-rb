import { TableEntities } from 'components/ExcelTable';

import { isNoneColumnType } from './helpers';

describe('isNoneColumnType', () => {
  test('ID', () => {
    expect(isNoneColumnType(TableEntities.ID)).toBeTruthy();
  });

  test('Splitter', () => {
    expect(isNoneColumnType(TableEntities.SPLITTER)).toBeTruthy();
  });

  test('Common table entity', () => {
    expect(isNoneColumnType(TableEntities.GEO_CATEGORY)).toBeFalsy();
  });
});
