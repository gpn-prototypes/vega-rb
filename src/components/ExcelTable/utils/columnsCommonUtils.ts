import { ComponentType } from 'react';
import { HeaderRendererProps } from 'react-data-grid';
import {
  FormatterProps,
  GridRow,
  IGridColumn,
  TableEntities,
} from 'components/ExcelTable/types';
import { curry } from 'lodash/fp';

import { getEditor } from './getEditor';

type BaseProps = {
  formatter: ComponentType<FormatterProps<GridRow>>;
  headerRenderer: ComponentType<HeaderRendererProps<GridRow>>;
};

export const getBaseProps = (
  formatter: ComponentType<FormatterProps<GridRow>>,
  HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>,
  type: TableEntities = TableEntities.NONE,
): BaseProps => ({
  formatter,
  headerRenderer: HeaderRenderer,
  ...getEditor(type),
});

export const columnsCommonUtils = curry<
  BaseProps,
  IGridColumn,
  // TODO: implement types of extraProps
  // eslint-disable-next-line @typescript-eslint/ban-types
  Object,
  IGridColumn
>((baseProps, column, extraProps) => {
  return {
    ...column,
    ...baseProps,
    ...extraProps,
  };
});
