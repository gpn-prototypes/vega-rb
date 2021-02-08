import React, { useCallback, useRef } from 'react';
import { CellRendererProps, Row, RowRendererProps } from 'react-data-grid';
import { useSelector } from 'react-redux';
import { classnames } from '@bem-react/classnames';
import { get } from 'lodash/fp';
import { RootState } from 'store/types';

import { CellWithError, DropDownCell } from '../Cells';
import { withContextMenu } from '../ContextMenu';
import { GridColumn, GridRow, TableEntities } from '../types';

import { cnRow } from './cn-row';

import './StyledRow.css';

const CellRenderer: React.FC<CellRendererProps<GridRow>> = (
  props,
): JSX.Element => {
  const column = props.column as GridColumn;
  const ref = useRef<HTMLDivElement>(null);

  if (column.type === TableEntities.GEO_CATEGORY_TYPE)
    return <DropDownCell {...props} />;

  return <CellWithError {...props} ref={ref} />;
};

export default React.memo<RowRendererProps<GridRow>>(function StyledRow(props) {
  const collect = (): { rowIdx: number } => ({ rowIdx: props.rowIdx });
  const errors = useSelector(({ table }: RootState) => table.errors);
  const getError = useCallback(
    (errorsList) => get(`row-${props.rowIdx}`, errorsList),
    [props.rowIdx],
  );
  const error = getError(errors);

  return withContextMenu(
    <Row
      {...props}
      cellRenderer={CellRenderer}
      className={classnames(
        cnRow(),
        cnRow.state({ error }),
        cnRow(props.rowIdx % 2 ? 'Even' : 'Odd'),
      )}
    />,
    { id: 'row-context-menu', collect },
  );
});
