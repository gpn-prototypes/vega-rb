import React from 'react';
import { curry } from 'lodash';

import { CellWithError } from '../Cells/CellWithError';
import Header from '../Header';
import {
  columnsFactory,
  columnsReorder,
  onBlurCell,
  setColumnAttributes,
} from '../helpers';
import { IGridColumn } from '../types';

const renderColumns = (
  columns: IGridColumn[],
  setColumns: (data: IGridColumn[]) => void,
): IGridColumn[] => {
  const setColumnProps = curry(setColumnAttributes)(columns, setColumns);
  const handleColumnsReorder = curry(columnsReorder)(columns, setColumns);
  const onBlurHandler = curry(onBlurCell)(columns, setColumns);

  return columns.map((column) =>
    columnsFactory(
      column,
      (props) => <CellWithError {...props} columns={columns} />,
      React.memo((props) => (
        <Header
          {...props}
          setColumnProps={setColumnProps}
          handleColumnsReorder={handleColumnsReorder}
          onBlurHandler={onBlurHandler}
        />
      )),
    ),
  );
};

export default renderColumns;
