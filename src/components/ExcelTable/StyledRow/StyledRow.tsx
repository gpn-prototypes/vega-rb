import React from 'react';
import { Row, RowRendererProps } from 'react-data-grid';
import classNames from 'classnames';

import { withContextMenu } from '../ContextMenu';
import { GridRow } from '../types';

import styles from './StyledRow.module.css';

export default React.memo<RowRendererProps<GridRow>>(function StyledRow(props) {
  const collect = (): { rowIdx: number } => ({ rowIdx: props.rowIdx });

  return withContextMenu(
    <Row
      {...props}
      className={classNames(styles.Row, props.rowIdx % 2 ? styles.RowEven : styles.RowOdd)}
    />,
    { id: 'row-context-menu', collect },
  );
});
