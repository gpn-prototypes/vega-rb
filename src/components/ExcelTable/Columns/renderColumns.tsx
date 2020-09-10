import React from 'react';

import { columnsFactory } from '../helpers';
import { IGridColumn } from '../types';

const renderColumns = (
  columns: IGridColumn[],
  Component: JSX.Element,
): IGridColumn[] =>
  columns.map((column) =>
    columnsFactory(
      column,
      ({ row, column: col }) => <>{row[col.key]?.value ?? ''}</>,
      (props) => React.cloneElement(Component, props),
    ),
  );

export default renderColumns;
