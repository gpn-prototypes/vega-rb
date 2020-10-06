import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from '@gpn-prototypes/vega-tooltip';
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
  const ref = useRef(null);
  const [isShowError, setIsShowError] = useState(true);
  const errors = useSelector(({ table }: RootState) => table.errors);
  const error = errors.find(({ row: rowIdx, column: columnIdx, tableName }) => {
    const tableColumnIdx = columns
      .filter((c) => c.type === column.type)
      .findIndex((c) => c.key === column.key);
    // TODO: fix it
    const isSameTableType =
      (column.type === TableEntities.GEO_CATEGORY &&
        tableName === TableNames.DomainEntities) ||
      (column.type === TableEntities.CALC_PARAM &&
        tableName === TableNames.Attributes);
    const isSameColumn = tableColumnIdx === columnIdx;
    const isSameRow = rowIdx === currentRowIdx;

    return isSameRow && isSameColumn && isSameTableType;
  });
  const handleMouseEnter = () => {
    setIsShowError(true);
  };
  const handleMouseLeave = () => {
    setIsShowError(false);
  };

  return (
    <>
      <span
        className={cn({
          [cnCellValueError]: !!error,
        })}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {row[column.key]?.value ?? ''}
      </span>
      {isShowError && error && (
        <Tooltip size="s" anchorRef={ref} direction="rightCenter">
          {error.message}
        </Tooltip>
      )}
    </>
  );
};
