import React from 'react';
import { HeaderRendererProps } from 'react-data-grid';
import { getHeaderComponent } from 'components/ExcelTable/Header';
import { curry } from 'lodash/fp';

import { columnsReorder, onBlurCell, setColumnAttributes } from '../helpers';
import { GridColumn, GridRow } from '../types';
import { columnsFactory } from '../utils';

export const renderColumns = (
  columns: GridColumn[],
  setColumns: (data: GridColumn[]) => void,
): GridColumn[] => {
  const setColumnProps = curry(setColumnAttributes)(columns, setColumns);
  const handleColumnsReorder = curry(columnsReorder)(columns, setColumns);
  const onBlurHandler = curry(onBlurCell)(columns, setColumns);

  const HeaderRenderer = (props: HeaderRendererProps<GridRow>) => {
    const HeaderComponent = getHeaderComponent(
      (props.column as GridColumn).type,
    );

    return (
      <HeaderComponent
        {...props}
        setColumnProps={setColumnProps}
        handleColumnsReorder={handleColumnsReorder}
        onBlurHandler={onBlurHandler}
      />
    );
  };

  return columns
    .filter((column) => column?.visible?.table)
    .map((column) => columnsFactory(column, HeaderRenderer));
};
