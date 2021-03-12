import React, { forwardRef, PropsWithChildren, useRef, useState } from 'react';
import { CalculatedColumn, CellRendererProps } from 'react-data-grid';
import { Tooltip } from '@gpn-prototypes/vega-ui';
import cn from 'classnames';
import useCombinedRefs from 'hooks/useCombinedRefs';
import useGetError from 'hooks/useGetError';
import { isEmpty } from 'utils';
import { getRowId } from 'utils/getRowId';

import { cnCellTooltip, cnCellValueError } from '../cn-excel-table';
import { GridRow, UniColumn } from '../types';

type Props = PropsWithChildren<CellRendererProps<GridRow>>;

export function getCellStyle<R, SR>(
  column: CalculatedColumn<R, SR>,
): React.CSSProperties {
  return column.frozen
    ? { left: `var(--frozen-left-${column.key})` }
    : { gridColumnStart: column.idx + 1 };
}

function CellWithError(props: Props, ref: React.Ref<HTMLDivElement>) {
  const {
    rowIdx: currentRowIdx,
    row,
    onRowClick,
    selectCell,
    selectRow,
    onContextMenu,
    onDragOver,
    onKeyDown,
    isCopied,
    isDraggedOver,
    dragHandleProps,
    onRowChange,
    isRowSelected,
    isCellSelected,
  } = props;
  const column = props.column as UniColumn;
  const innerRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(ref, innerRef);
  const [isShowError, setIsShowError] = useState(false);
  const [error] = useGetError([column.key, getRowId(row)]);
  const position = {
    idx: column.idx,
    rowIdx: currentRowIdx,
  };

  const selectCellWrapper = (shouldOpenEditor?: boolean) => {
    selectCell(position, shouldOpenEditor);
  };

  const handleCellClick = () => {
    selectCellWrapper(column.editorOptions?.editOnClick);
    onRowClick?.(currentRowIdx, row, column);
  };

  function handleDoubleClick() {
    selectCellWrapper(true);
  }

  const handleRowChange = (newRow: GridRow) => {
    onRowChange(currentRowIdx, newRow);
  };

  const onRowSelectionChange = (checked: boolean, isShiftClick: boolean) => {
    selectRow({
      rowIdx: currentRowIdx,
      checked,
      isShiftClick,
    });
  };

  const rowObject = {
    ...row,
    [column.key]:
      error && isEmpty(row[column.key]?.value)
        ? { value: '—' }
        : row[column.key],
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      aria-colindex={column.idx + 1}
      aria-selected={isCellSelected}
      className={cn('rdg-cell', column.cellClass, {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-selected': isCellSelected,
        'rdg-cell-dragged-over': isDraggedOver,
        'rdg-cell-copied': isCopied,
        [cnCellValueError]: !!error,
      })}
      style={getCellStyle(column)}
      onClick={(e) => {
        handleCellClick();
      }}
      onDoubleClick={(e) => {
        handleDoubleClick();
      }}
      onContextMenu={(e) => {
        onContextMenu?.(e);
      }}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsShowError(true)}
      onMouseLeave={() => setIsShowError(false)}
      onDragOver={onDragOver}
      ref={combinedRef}
    >
      <column.formatter
        column={column}
        rowIdx={currentRowIdx}
        row={rowObject}
        isRowSelected={isRowSelected}
        isCellSelected={isCellSelected}
        onRowChange={handleRowChange}
        onRowSelectionChange={onRowSelectionChange}
      />
      {dragHandleProps && (
        <div className="rdg-cell-drag-handle" {...dragHandleProps} />
      )}
      {isShowError && error && (
        <Tooltip
          size="s"
          anchorRef={combinedRef}
          direction="rightCenter"
          className={cnCellTooltip.toString()}
        >
          {error.message}
        </Tooltip>
      )}
    </div>
  );
}

export default React.memo(forwardRef<HTMLDivElement, Props>(CellWithError));
