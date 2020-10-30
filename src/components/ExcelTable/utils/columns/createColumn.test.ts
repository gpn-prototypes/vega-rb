import { TableEntities } from 'components/ExcelTable/types';

import { createColumn } from './createColumn';

describe('createColumn function', () => {
  test('default', () => {
    const column = createColumn();
    expect(column).toMatchObject({
      name: '',
      editable: true,
      resizable: true,
      sortable: true,
      type: TableEntities.NONE,
      hasIcon: false,
      isRenaming: true,
    });
  });

  test('column with icon', () => {
    const column = createColumn(TableEntities.GEO_CATEGORY);
    expect(column).toMatchObject({
      name: '',
      editable: true,
      resizable: true,
      sortable: true,
      type: TableEntities.GEO_CATEGORY,
      hasIcon: true,
      isRenaming: true,
    });
  });
});
