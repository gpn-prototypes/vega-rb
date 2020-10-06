import React, { useRef } from 'react';
import { Row, RowRendererProps } from 'react-data-grid';
import { useSelector } from 'react-redux';
import { classnames } from '@bem-react/classnames';
import { RootState } from 'store/types';

import CellWithError from '../Cells';
import { withContextMenu } from '../ContextMenu';
import { GridRow } from '../types';

import { cnRow } from './cn-row';

import './StyledRow.css';

export default React.memo<RowRendererProps<GridRow>>(function StyledRow(props) {
  const collect = (): { rowIdx: number } => ({ rowIdx: props.rowIdx });
  const columns = useSelector((state: RootState) => state.table.columns);
  const ref = useRef<HTMLDivElement>(null);
  return withContextMenu(
    <Row
      {...props}
      className={classnames(cnRow(), cnRow(props.rowIdx % 2 ? 'Even' : 'Odd'))}
      cellRenderer={(p) => <CellWithError {...p} columns={columns} ref={ref} />}
    />,
    { id: 'row-context-menu', collect },
  );
});
