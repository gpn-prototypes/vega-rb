import React from 'react';

import { columnsFactory } from '../helpers';
import { IGridColumn } from '../types';

const renderColumns = (
  columns: IGridColumn[],
  Component: JSX.Element,
): IGridColumn[] =>
  columns.map((column) =>
    columnsFactory(column, (props) => React.cloneElement(Component, props)),
  );

export default renderColumns;
