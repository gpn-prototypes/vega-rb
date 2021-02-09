import { useSelector } from 'react-redux';
import { GridColumn } from 'components/ExcelTable/types';
import { RootState } from 'store/types';
import { NoopFunction } from 'types';

export default function useValidateByColumns<R>(
  validator: NoopFunction<GridColumn[], R>,
): R {
  const columns = useSelector(({ table }: RootState) => table.columns);

  return validator(columns);
}
