import React, {
  forwardRef,
  PropsWithoutRef,
  RefAttributes,
  RefObject,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CellRendererProps } from 'react-data-grid';
import { useSelector } from 'react-redux';
import { Tooltip } from '@gpn-prototypes/vega-ui';
import cn from 'classnames';
import { TableNames } from 'generated/graphql';
import useCombinedRefs from 'hooks/useCombinedRefs';
import { RootState } from 'store/types';

import { cnCellValueError } from '../cn-excel-table';
import { GridColumn, GridRow, TableEntities } from '../types';
import {
  preventDefault,
  wrapEvent,
} from '../utils/eventUtilsReplacementsDataGrid';

interface IProps extends CellRendererProps<GridRow> {
  columns: GridColumn[];
}

const CellWithError: React.ForwardRefExoticComponent<
  PropsWithoutRef<IProps> & RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => {
  const {
    columns,
    column,
    rowIdx: currentRowIdx,
    row,
    // lastFrozenColumnIndex,
    selectCell: selectCellDataGrid,
    selectRow: selectRowDataGrid,
    isCellSelected,
    onRowClick,
    onClick,
    onDoubleClick,
    onContextMenu,
    onDragOver,
    isRowSelected,
    onRowChange,
  } = props;
  const innerRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(ref, innerRef);
  const [isShowError, setIsShowError] = useState(false);
  const errors = useSelector(({ table }: RootState) => table.errors);
  const error = useMemo(
    () =>
      // TODO: поправить условие после обновления API(заменить columnIdx на columnKey)
      errors.find(({ row: rowIdx, column: columnIdx, tableName }) => {
        const tableColumnIdx = columns
          .filter((c) => c.type === (column as GridColumn).type)
          .findIndex((c) => c.key === (column as GridColumn).key);
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
    selectCellDataGrid({ idx: column.idx, rowIdx: currentRowIdx }, openEditor);
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

  function handleRowChange(newRow: GridRow) {
    onRowChange(currentRowIdx, newRow);
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    selectRowDataGrid({ rowIdx: currentRowIdx, checked, isShiftClick });
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cn('rdg-cell', column.cellClass, {
        'rdg-cell-frozen': column.frozen,
        // 'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex,
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
        row,
        isRowSelected,
        onRowSelectionChange,
        isCellSelected,
        onRowChange: handleRowChange,
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
