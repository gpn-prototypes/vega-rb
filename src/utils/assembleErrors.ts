import { TableError } from 'generated/graphql';
import { set } from 'lodash/fp';
import { ColumnErrors } from 'types';

import { isEmpty } from './isEmpty';

export const COLUMN_ERROR_KEY = `COLUMN_ERROR`;

export function assembleErrors(errors: TableError[]): ColumnErrors {
  return errors.reduce((previousValue, currentValue) => {
    const { columnKey, row: rowId, code } = currentValue;

    if (code === 'DUPLICATING_COLUMNS') {
      return set(COLUMN_ERROR_KEY, currentValue, previousValue);
    }

    if (isEmpty(columnKey) && !isEmpty(rowId)) {
      return set(`row-${rowId!}`, currentValue, previousValue);
    }

    if (columnKey && !isEmpty(rowId)) {
      return set([columnKey, rowId!], currentValue, previousValue);
    }
    return previousValue;
  }, {} as ColumnErrors);
}
