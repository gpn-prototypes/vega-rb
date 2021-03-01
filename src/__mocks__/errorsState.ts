import { RbErrorCodes, TableNames } from 'generated/graphql';
import { ErrorsState } from 'store/types';

export const errorsState: ErrorsState = {
  ids: ['project_0001'],
  byId: {
    project_0001: {
      COLUMN_POLL: {
        ROW_ID: {
          code: RbErrorCodes.DistributionParameterOutOfRange,
          message: 'Something wrong',
          tableName: TableNames.Risks,
        },
      },
    },
  },
};

export const errorPayload = {
  id: 'project_0002',
  errors: {
    mockedColumnKey: {
      mockedRowKey: {
        code: RbErrorCodes.DistributionParameterOutOfRange,
        message: 'Something wrong',
        tableName: TableNames.Risks,
      },
    },
  },
};
