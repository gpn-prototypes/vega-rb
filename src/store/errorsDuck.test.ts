import { errorPayload, errorsState } from '__mocks__/errorsState';
import { RbErrorCodes, TableNames } from 'generated/graphql';
import errorsDuck from 'store/errorsDuck';

describe('errorsDuck', () => {
  test('Обновление ошибок', () => {
    const state = {
      ids: [],
      byId: {},
    };

    expect(
      errorsDuck.reducer(state, errorsDuck.actions.updateErrors(errorPayload)),
    ).toMatchObject({
      ids: ['project_0002'],
      byId: {
        project_0002: {
          mockedColumnKey: {
            mockedRowKey: {
              code: RbErrorCodes.DistributionParameterOutOfRange,
              message: 'Something wrong',
              tableName: TableNames.Risks,
            },
          },
        },
      },
    });
  });

  test('Удаление ошибки по конкретному адресу', () => {
    expect(
      errorsDuck.reducer(
        errorsState,
        errorsDuck.actions.removeErrors({
          id: 'project_0001',
          path: ['COLUMN_POLL', 'ROW_ID'],
        }),
      ),
    ).toMatchObject({
      ids: [],
      byId: {
        project_0001: { COLUMN_POLL: {} },
      },
    });
  });
});
