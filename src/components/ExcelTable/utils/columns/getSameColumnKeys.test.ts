import { columnsListMock } from '__mocks__/columnsList';

import { getSameColumnKeys } from './getSameColumnKeys';

describe('getSameColumnKeys', () => {
  test('Found more than 2 matches with passed column', () => {
    expect(getSameColumnKeys(columnsListMock[5], columnsListMock)).toHaveLength(
      2,
    );
  });

  test('Found only 2 matches with passed column', () => {
    expect(getSameColumnKeys(columnsListMock[1], columnsListMock)).toHaveLength(
      0,
    );
  });

  test("Didn't find matches with passed column", () => {
    const expected = [String(columnsListMock[3].key)];
    expect(getSameColumnKeys(columnsListMock[3], columnsListMock)).toEqual(
      expect.arrayContaining(expected),
    );
  });
});
