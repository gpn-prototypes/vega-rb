import React from 'react';
import { HeaderRendererProps } from 'react-data-grid';
import { getHeaderComponent } from 'components/ExcelTable/Header';
import {
  handleColumnsReorder,
  setColumnProps,
} from 'components/ExcelTable/helpers';
import { columnsFactory } from 'components/ExcelTable/utils';
import { RbErrorCodes } from 'generated/graphql';
import { useUpdateErrors } from 'hooks';
import { get } from 'lodash/fp';
import { ColumnErrors } from 'types';

import { ColumnProperties, GridColumn, GridRow } from '../types';

function validate(column: GridColumn, properties: ColumnProperties): boolean {
  return !properties.isRenaming && column.name !== String(properties.name);
}

export const renderColumns = (
  columns: GridColumn[],
  errors: ColumnErrors,
  setColumns: (data: GridColumn[]) => void,
): GridColumn[] => {
  const HeaderRenderer = (props: HeaderRendererProps<GridRow>) => {
    const { column }: { column: GridColumn } = props;
    const HeaderComponent = getHeaderComponent(column.type);
    const updateErrors = useUpdateErrors();
    const setProps = setColumnProps(columns, setColumns);

    return (
      <HeaderComponent
        {...props}
        setColumnProps={(idx, properties) => {
          setProps(idx, properties);
          if (validate(column, properties))
            updateErrors({ ...column, name: String(properties.name) }, columns);
        }}
        handleColumnsReorder={handleColumnsReorder(columns, setColumns)}
      />
    );
  };

  return columns
    .filter((column) => column?.visible?.table)
    .map((column) =>
      columnsFactory(
        {
          ...column,
          error: get([RbErrorCodes.DuplicatingColumns, column.key], errors),
        },
        HeaderRenderer,
      ),
    );
};
