import * as faker from 'faker';
import { RbErrorCodes, TableError, TableNames } from 'generated/graphql';

export const tableErrorsList: TableError[] = [
  {
    code: RbErrorCodes.DuplicatingColumns,
    message: faker.lorem.text(),
    tableName: TableNames.Attributes,
    columnKey: 'AREA',
  },
  {
    code: RbErrorCodes.DuplicatingColumns,
    message: faker.lorem.text(),
    tableName: TableNames.Attributes,
    columnKey: 'AREA',
  },
  {
    code: RbErrorCodes.DuplicatingColumns,
    message: faker.lorem.text(),
    tableName: TableNames.Attributes,
    columnKey: 'AREA',
  },
  {
    code: RbErrorCodes.EmptyDomainEntities,
    message: faker.lorem.text(),
    tableName: TableNames.Attributes,
    row: 564,
    columnKey: 'AREA',
  },
  {
    code: RbErrorCodes.DistributionParameterOutOfRange,
    message: faker.lorem.text(),
    tableName: TableNames.Attributes,
    row: 665,
    columnKey: 'SQUARE',
  },
  {
    code: RbErrorCodes.CellValueIsNull,
    message: faker.lorem.text(),
    tableName: TableNames.Attributes,
    row: 666,
  },
];
