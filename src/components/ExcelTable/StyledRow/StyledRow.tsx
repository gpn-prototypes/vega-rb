import React, { useRef } from 'react';
import { CellRendererProps, Row, RowRendererProps } from 'react-data-grid';
import { classnames } from '@bem-react/classnames';
import { ContextMenuId, TableEntities } from 'components/ExcelTable/enums';
import { useGetError } from 'hooks';

import { CellWithError, DropDownCell } from '../Cells';
import { withContextMenu } from '../ContextMenu';
import { GridColumn, GridRow } from '../types';

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
  const [error] = useGetError(`row-${props.rowIdx}`);

  return withContextMenu(
    <Row
      {...props}
      cellRenderer={CellRenderer}
      className={classnames(
        cnRow(),
        cnRow.state({ error: !!error }),
        cnRow(props.rowIdx % 2 ? 'Even' : 'Odd'),
      )}
    />,
    { id: ContextMenuId.ROW, collect },
  );
});
