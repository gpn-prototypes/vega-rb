/* eslint-disable */
// @ts-nocheck
import React from 'react';
import {
  Cell,
  CellRendererProps,
  Row,
  RowRendererProps,
} from 'react-data-grid';
import { classnames } from '@bem-react/classnames';
import { DropDownCell } from 'components/ExcelTable/Cells';

import { withContextMenu } from '../ContextMenu';
import { GridColumn, GridRow, TableEntities } from '../types';

import { cnRow } from './cn-row';

import './StyledRow.css';

const CellRenderer: React.FC<CellRendererProps<GridRow>> = (
  props,
): JSX.Element => {
  const column = props.column as GridColumn;
  if (column.type === TableEntities.GEO_CATEGORY_TYPE)
    return <DropDownCell {...props} />;

  return <Cell {...props} />;
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
