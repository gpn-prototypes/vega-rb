import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { TableNames } from 'generated/graphql';
import { curry } from 'lodash';
import { RootState } from 'store/types';

import { cnCellValueError } from '../cn-excel-table';
import Header from '../Header';
import {
  columnsFactory,
  columnsReorder,
  onBlurCell,
  setColumnAttributes,
} from '../helpers';
import { IGridColumn, TableEntities } from '../types';

const renderColumns = (
  columns: IGridColumn[],
  setColumns: (data: IGridColumn[]) => void,
): IGridColumn[] => {
  const setColumnProps = curry(setColumnAttributes)(columns, setColumns);
  const handleColumnsReorder = curry(columnsReorder)(columns, setColumns);
  const onBlurHandler = curry(onBlurCell)(columns, setColumns);

  return columns.map((column) =>
    columnsFactory(
      column,
      (props) => {
        const errors = useSelector(({ table }: RootState) => table.errors);
        const tableColumnIdx = columns
          .filter((c) => c.type === column.type)
          .findIndex((c) => c.key === column.key);
        const hasError = useMemo(
          () =>
            errors?.find(
              ({ row: rowIdx, column: columnIdx, tableName }) =>
                rowIdx === props.rowIdx &&
                tableColumnIdx === columnIdx &&
                ((column.type === TableEntities.GEO_CATEGORY &&
                  tableName === TableNames.DomainEntities) ||
                  (column.type === TableEntities.CALC_PARAM &&
                    tableName === TableNames.Attributes)),
            )?.message,
          [errors, props.rowIdx, tableColumnIdx],
        );

        return (
          <span
            className={cn({
              [cnCellValueError]: hasError,
            })}
          >
            {props.row[props.column.key]?.value ?? ''}
          </span>
        );
      },
      React.memo((props) => (
        <Header
          {...props}
          setColumnProps={setColumnProps}
          handleColumnsReorder={handleColumnsReorder}
          onBlurHandler={onBlurHandler}
        />
      )),
    ),
  );
};

export default renderColumns;
