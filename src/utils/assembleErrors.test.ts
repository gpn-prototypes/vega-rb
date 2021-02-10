import { tableErrorsList } from '__mocks__/tableErrorsList';
import { RbErrorCodes } from 'generated/graphql';

import { assembleErrors, COLUMN_ERROR_KEY } from './assembleErrors';

describe('assembleErrors', () => {
  test('Validate keys generation', () => {
    const expected = [
      COLUMN_ERROR_KEY,
      RbErrorCodes.DuplicatingColumns,
      'AREA',
      'SQUARE',
      'row-666',
    ];

    expect(Object.keys(assembleErrors(tableErrorsList))).toEqual(
      expect.arrayContaining(expected),
    );
  });
});
