import React, { useRef } from 'react';
import { CellRendererProps, Row, RowRendererProps } from 'react-data-grid';
import { classnames } from '@bem-react/classnames';
import { withContextMenu } from 'components/ContextMenu/withContextMenu';

import { CellWithError, DropDownCell } from '../Cells';
import { GridColumn, GridRow, TableEntities } from '../types';

import { cnRow } from './cn-row';

import './StyledRow.css';

const CellRenderer: React.FC<CellRendererProps<GridRow>> = (
  props,
): JSX.Element => {
  const column = props.column as GridColumn;
  // const columns = useSelector((state: RootState) => state.table.columns);
  const ref = useRef<HTMLDivElement>(null);

  if (column.type === TableEntities.GEO_CATEGORY_TYPE)
    return <DropDownCell {...props} />;

  return <CellWithError {...props} ref={ref} />;
};

export default React.memo<RowRendererProps<GridRow>>(function StyledRow(props) {
  const collect = (): { rowIdx: number } => ({ rowIdx: props.rowIdx });

  return withContextMenu(
    <Row
      {...props}
      cellRenderer={CellRenderer}
      className={classnames(cnRow(), cnRow(props.rowIdx % 2 ? 'Even' : 'Odd'))}
    />,
    { id: 'row-context-menu', collect },
  );
});
