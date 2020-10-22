/* eslint-disable */
// @ts-nocheck
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { forwardRef, PropsWithChildren, useState } from 'react';
import { CellRendererProps } from 'react-data-grid';
import { preventDefault, wrapEvent } from 'react-data-grid/lib/utils';
import classNames from 'classnames';
import { GridRow } from 'components/ExcelTable/types';
import { Button, IconSelect } from '@gpn-prototypes/vega-ui';

type IProps = PropsWithChildren<CellRendererProps<GridRow>>;

function getClassNames(frozen: boolean | undefined, isLastFrozen: boolean) {
  return {
    'rdg-cell-frozen': frozen,
    'rdg-cell-frozen-last': isLastFrozen,
  };
}

function DropDownCell(
  props: IProps,
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
    className,
  );

  const selectCell = (openEditor?: boolean) => {
    eventBus.dispatch('SELECT_CELL', { rowIdx, idx: column.idx }, openEditor);
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

  const handleCellDoubleClick = () => {
    selectCell(true);
  };

  const onRowSelectionChange = (checked: boolean, isShiftClick: boolean) => {
    eventBus.dispatch('SELECT_ROW', { rowIdx, checked, isShiftClick });
  };

  return (
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
      <Button
        size="xs"
        iconLeft={IconSelect}
        view="ghost"
        onlyIcon
        style={{
          float: 'right',
          margin: '4px 0px',
        }}
      />
    </div>
  );
}

export default React.memo(forwardRef<HTMLDivElement, IProps>(DropDownCell));
