import React from 'react';
import { curry } from 'lodash';

import { Formatter } from '../Formatters';
import Header from '../Header';
import { columnsReorder, onBlurCell, setColumnAttributes } from '../helpers';
import { GridColumn } from '../types';
import { columnsFactory } from '../utils';

const renderColumns = (
  columns: GridColumn[],
  setColumns: (data: GridColumn[]) => void,
): GridColumn[] => {
  const setColumnProps = curry(setColumnAttributes)(columns, setColumns);
  const handleColumnsReorder = curry(columnsReorder)(columns, setColumns);
  const onBlurHandler = curry(onBlurCell)(columns, setColumns);

  return columns.map((column) =>
    columnsFactory(
      column,
      Formatter,
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
