import React from 'react';
import { Row, RowRendererProps } from 'react-data-grid';
import { classnames } from '@bem-react/classnames';

import { withContextMenu } from '../ContextMenu';
import { GridRow } from '../types';

import { cnRow } from './cn-row';

import './StyledRow.css';

export default React.memo<RowRendererProps<GridRow>>(function StyledRow(props) {
  const collect = (): { rowIdx: number } => ({ rowIdx: props.rowIdx });

  return withContextMenu(
    <Row
      {...props}
      className={classnames(cnRow(), cnRow(props.rowIdx % 2 ? 'Even' : 'Odd'))}
    />,
    { id: 'row-context-menu', collect },
  );
});
