import React from 'react';
import Formatter from 'components/ExcelTable/Formatters';
import { curry } from 'lodash';

import Header from '../Header';
import { columnsReorder, onBlurCell, setColumnAttributes } from '../helpers';
import { IGridColumn } from '../types';
import { columnsFactory } from '../utils';

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
