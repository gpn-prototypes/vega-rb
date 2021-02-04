import { useDispatch, useSelector } from 'react-redux';
import { GridColumn } from 'components/ExcelTable/types';
import { getSameColumnKeys } from 'components/ExcelTable/utils/columns/getSameColumnKeys';
import { RbErrorCodes } from 'generated/graphql';
import { unset } from 'lodash/fp';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { ColumnErrors } from 'types';
import { Action } from 'typescript-fsa';

type UseUpdateErrors = (
  column: GridColumn,
  columns: GridColumn[],
) => Action<ColumnErrors>;

function getCleanedErrorsList(
  column: GridColumn,
  columns: GridColumn[],
  errors: ColumnErrors,
) {
  return getSameColumnKeys(column, columns).reduce<ColumnErrors>(
    (previousValue, currentValue) =>
      unset([RbErrorCodes.DuplicatingColumns, currentValue], previousValue),
    errors,
  );
}

export default function useUpdateErrors(): UseUpdateErrors {
  const errors = useSelector(({ table }: RootState) => table.errors);
  const dispatch = useDispatch();

  return (column, columns) =>
    dispatch(
      tableDuck.actions.updateErrors(
        getCleanedErrorsList(column, columns, errors),
      ),
    );
}
