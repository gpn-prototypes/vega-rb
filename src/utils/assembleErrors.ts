import { ColumnErrors } from 'components/ExcelTable/types';
import { RbErrorCodes, TableError } from 'generated/graphql';
import { flow, set } from 'lodash/fp';

import { isEmpty } from './isEmpty';

export const COLUMN_ERROR_KEY = `COLUMN_ERROR`;

export function assembleErrors(errors: TableError[]): ColumnErrors {
  return errors.reduce((previousValue, currentValue) => {
    const { columnKey, row: rowId, code } = currentValue;

    if (code === RbErrorCodes.DuplicatingColumns && columnKey) {
      return flow(
        (prev: ColumnErrors) => set([COLUMN_ERROR_KEY], currentValue, prev),
        (prev: ColumnErrors) =>
          set([RbErrorCodes.DuplicatingColumns, columnKey], currentValue, prev),
      )(previousValue);
    }

    if (!isEmpty(rowId)) {
      if (columnKey) {
        return set([columnKey, rowId!], currentValue, previousValue);
      }

      return set(`row-${rowId!}`, currentValue, previousValue);
    }

    return previousValue;
  }, {} as ColumnErrors);
}
