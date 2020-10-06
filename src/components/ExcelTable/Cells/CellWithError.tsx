import React, {
  forwardRef,
  MutableRefObject,
  PropsWithoutRef,
  RefAttributes,
  RefObject,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CellRendererProps } from 'react-data-grid/lib/common/types';
import { preventDefault, wrapEvent } from 'react-data-grid/lib/utils';
import { useSelector } from 'react-redux';
import { Tooltip } from '@gpn-prototypes/vega-tooltip';
import cn from 'classnames';
import { TableNames } from 'generated/graphql';
import { RootState } from 'store/types';

import { cnCellValueError } from '../cn-excel-table';
import { GridRow, IGridColumn, TableEntities } from '../types';

interface IProps extends CellRendererProps<GridRow> {
  columns: IGridColumn[];
}

const CellWithError: React.ForwardRefExoticComponent<
  PropsWithoutRef<IProps> & RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => {
  const {
    columns,
    column,
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
  const innerRef = useRef<HTMLDivElement>(
    (ref as MutableRefObject<HTMLDivElement | null>).current,
  );
  const [isShowError, setIsShowError] = useState(false);
  const errors = useSelector(({ table }: RootState) => table.errors);
  const error = useMemo(
    () =>
      errors.find(({ row: rowIdx, column: columnIdx, tableName }) => {
        const tableColumnIdx = columns
          .filter((c) => c.type === (column as IGridColumn).type)
          .findIndex((c) => c.key === (column as IGridColumn).key);
        // TODO: fix it
        const isSameTableType =
          (column.key === TableEntities.GEO_CATEGORY &&
            tableName === TableNames.DomainEntities) ||
          ((column as IGridColumn).type === TableEntities.CALC_PARAM &&
            tableName === TableNames.Attributes);
        const isSameColumn = tableColumnIdx === columnIdx;
        const isSameRow = rowIdx === currentRowIdx;

        return isSameRow && isSameColumn && isSameTableType;
      }),
    [column, columns, currentRowIdx, errors],
  );

  function selectCell(openEditor?: boolean) {
    eventBus.dispatch(
      'SELECT_CELL',
      { idx: column.idx, rowIdx: currentRowIdx },
      openEditor,
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
      ref={innerRef}
    >
      {React.createElement(column.formatter, {
        column,
        rowIdx: currentRowIdx,
        row,
        isRowSelected,
        onRowSelectionChange,
      })}
      {isShowError && error && (
        <Tooltip
          size="s"
          anchorRef={innerRef as RefObject<HTMLDivElement>}
          direction="rightCenter"
        >
          {error.message}
        </Tooltip>
      )}
    </div>
  );
});

export default CellWithError;
