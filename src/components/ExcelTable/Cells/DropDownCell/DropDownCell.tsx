import React, { forwardRef, PropsWithChildren } from 'react';
import { CellRendererProps } from 'react-data-grid';
import { IconSelect } from '@gpn-prototypes/vega-ui';
import classNames from 'classnames';
import { GridRow } from 'components/ExcelTable/types';

import {
  preventDefault,
  wrapEvent,
} from '../../utils/eventUtilsReplacementsDataGrid';

import { cnDropDownCell } from './cn-dropdown-cell';

import './DropDownCell.css';

type Props = PropsWithChildren<CellRendererProps<GridRow>>;

function getClassNames(frozen: boolean | undefined, isLastFrozen: boolean) {
  return {
    'rdg-cell-frozen': frozen,
    'rdg-cell-frozen-last': isLastFrozen,
  };
}

function DropDownCell(
  props: Props,
  ref: React.Ref<HTMLDivElement>,
): JSX.Element {
  const {
    className,
    column,
    isRowSelected,
    lastFrozenColumnIndex,
    row,
    rowIdx,
    eventBus,
    onRowClick,
    onClick,
    onDoubleClick,
    onContextMenu,
    onDragOver,
    ...rest
  } = props;

  const { frozen, idx: columnIdx, cellClass } = column;

  const style = {
    width: column.width,
    left: column.left,
  };

  const cellClassName = classNames(
    'rdg-cell',
    getClassNames(frozen, columnIdx === lastFrozenColumnIndex),
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    cnDropDownCell.toString(),
    className,
  );

  const selectCell = () => {
    const cellPosition = { rowIdx, idx: column.idx };
    eventBus.dispatch('SELECT_CELL', cellPosition);
  };

  const handleCellClick = () => {
    selectCell();
    if (onRowClick) {
      onRowClick(rowIdx, row, column);
    }
  };

  const handleCellContextMenu = () => {
    selectCell();
  };

  const onRowSelectionChange = (checked: boolean, isShiftClick: boolean) => {
    eventBus.dispatch('SELECT_ROW', { rowIdx, checked, isShiftClick });
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      className={classNames(cellClassName)}
      onClick={wrapEvent(handleCellClick, onClick)}
      onContextMenu={wrapEvent(handleCellContextMenu, onContextMenu)}
      onDragOver={wrapEvent(preventDefault, onDragOver)}
      style={style}
      {...rest}
    >
      <column.formatter
        row={row}
        rowIdx={rowIdx}
        column={column}
        isRowSelected={isRowSelected}
        onRowSelectionChange={onRowSelectionChange}
      />
      <div className={cnDropDownCell('IconWrapper')}>
        <IconSelect size="xs" />
      </div>
    </div>
  );
}

export default React.memo(forwardRef<HTMLDivElement, Props>(DropDownCell));
