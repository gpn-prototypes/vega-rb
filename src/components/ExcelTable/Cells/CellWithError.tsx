import React, {
  forwardRef,
  PropsWithChildren,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CellRendererProps } from 'react-data-grid/lib/common/types';
import { preventDefault, wrapEvent } from 'react-data-grid/lib/utils';
import { useSelector } from 'react-redux';
import { Tooltip } from '@gpn-prototypes/vega-ui';
import cn from 'classnames';
import { TableNames } from 'generated/graphql';
import useCombinedRefs from 'hooks/useCombinedRefs';
import { RootState } from 'store/types';

import { cnCellTooltip, cnCellValueError } from '../cn-excel-table';
import { GridColumn, GridRow, TableEntities, UniColumn } from '../types';

type Props = PropsWithChildren<CellRendererProps<GridRow>> & {
  columns: GridColumn[];
};

function CellWithError(props: Props, ref: React.Ref<HTMLDivElement>) {
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
  const innerRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(ref, innerRef);
  const [isShowError, setIsShowError] = useState(false);
  const errors = useSelector(({ table }: RootState) => table.errors);
  const error = useMemo(
    () =>
      // TODO: поправить условие после обновления API(заменить columnIdx на columnKey)
      errors.find(({ row: rowIdx, column: columnIdx, tableName }) => {
        const { key, type } = column as UniColumn;
        const tableColumnIdx = columns
          .filter((c) => c.type === type)
          .findIndex((c) => c.key === key);
        const isSameTableType =
          (column.key === TableEntities.GEO_CATEGORY &&
            tableName === TableNames.DomainEntities) ||
          ((column as GridColumn).type === TableEntities.CALC_PARAM &&
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

  const rowObject = {
    ...row,
    [column.key]: error
      ? {
          value: '—',
        }
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
          anchorRef={innerRef}
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
