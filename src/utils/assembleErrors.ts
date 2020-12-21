import { TableError } from 'generated/graphql';
import { set } from 'lodash/fp';
import { ColumnErrors } from 'types';

import { isEmpty } from './isEmpty';

export function assembleErrors(errors: TableError[]): ColumnErrors {
  return errors.reduce((previousValue, currentValue) => {
    const { columnKey, row: rowId } = currentValue;

    if (isEmpty(columnKey) && !isEmpty(rowId)) {
      return set(`row-${rowId!}`, currentValue, previousValue);
    }

    if (columnKey && !isEmpty(rowId)) {
      return set([columnKey, rowId!], currentValue, previousValue);
    }
    return previousValue;
  }, {} as ColumnErrors);
}
