import React, { forwardRef, PropsWithChildren, useRef, useState } from 'react';
import { CellRendererProps } from 'react-data-grid/lib/common/types';
import { preventDefault, wrapEvent } from 'react-data-grid/lib/utils';
import { Tooltip } from '@gpn-prototypes/vega-ui';
import cn from 'classnames';
import useCombinedRefs from 'hooks/useCombinedRefs';
import useGetError from 'hooks/useGetError';
import { isEmpty } from 'utils';
import { getRowId } from 'utils/getRowId';

import { cnCellTooltip, cnCellValueError } from '../cn-excel-table';
import { GridRow, UniColumn } from '../types';

type Props = PropsWithChildren<CellRendererProps<GridRow>>;

function CellWithError(props: Props, ref: React.Ref<HTMLDivElement>) {
  const {
    rowIdx: currentRowIdx,
    row,
    lastFrozenColumnIndex,
    eventBus,
    onRowClick,
    onClick,
    onDoubleClick,
    onContextMenu,
    onDragOver,
    isRowSelected,
  } = props;
  const column = props.column as UniColumn;
  const innerRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(ref, innerRef);
  const [isShowError, setIsShowError] = useState(false);
  const [error] = useGetError([column.key, getRowId(row)]);

  function selectCell(shouldOpenEditor?: boolean) {
    eventBus.dispatch(
      'SELECT_CELL',
      { idx: column.idx, rowIdx: currentRowIdx },
      shouldOpenEditor,
    );
  }

  function handleCellClick() {
    selectCell();
    if (onRowClick) {
      onRowClick(currentRowIdx, row, column);
    }
  }

  function handleCellContextMenu() {
    selectCell();
  }

  function handleCellDoubleClick() {
    selectCell(true);
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    eventBus.dispatch('SELECT_ROW', {
      rowIdx: currentRowIdx,
      checked,
      isShiftClick,
    });
  }

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
      className={cn('rdg-cell', column.cellClass, {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex,
        [cnCellValueError]: !!error,
      })}
      style={{
        width: column.width,
        left: column.left,
      }}
      onClick={wrapEvent(handleCellClick, onClick)}
      onDoubleClick={wrapEvent(handleCellDoubleClick, onDoubleClick)}
      onContextMenu={wrapEvent(handleCellContextMenu, onContextMenu)}
      onMouseEnter={() => setIsShowError(true)}
      onMouseLeave={() => setIsShowError(false)}
      onDragOver={wrapEvent(preventDefault, onDragOver)}
      ref={combinedRef}
    >
      {React.createElement(column.formatter, {
        column,
        rowIdx: currentRowIdx,
        row: rowObject,
        isRowSelected,
        onRowSelectionChange,
      })}
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
