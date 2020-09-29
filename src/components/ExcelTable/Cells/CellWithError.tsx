import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { TableNames } from 'generated/graphql';
import { RootState } from 'store/types';

import { cnCellValueError } from '../cn-excel-table';
import { GridRow, IGridColumn, TableEntities } from '../types';

interface CellWithErrorProps {
  columns: IGridColumn[];
  row: GridRow;
  column: IGridColumn;
  rowIdx: number;
}

export const CellWithError: React.FC<CellWithErrorProps> = ({
  columns,
  row,
  column,
  rowIdx: currentRowIdx,
}) => {
  const errors = useSelector(({ table }: RootState) => table.errors);
  const tableColumnIdx = columns
    .filter((c) => c.type === column.type)
    .findIndex((c) => c.key === column.key);
  const hasError = useMemo(
    () =>
      errors?.find(
        ({ row: rowIdx, column: columnIdx, tableName }) =>
          rowIdx === currentRowIdx &&
          tableColumnIdx === columnIdx &&
          ((column.type === TableEntities.GEO_CATEGORY &&
            tableName === TableNames.DomainEntities) ||
            (column.type === TableEntities.CALC_PARAM &&
              tableName === TableNames.Attributes)),
      )?.message,
    [errors, currentRowIdx, tableColumnIdx, column.type],
  );

  return (
    <span
      className={cn({
        [cnCellValueError]: hasError,
      })}
    >
      {row[column.key]?.value ?? ''}
    </span>
  );
};
