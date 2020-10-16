import { ComponentType } from 'react';
import { HeaderRendererProps } from 'react-data-grid';
import {
  BaseProps,
  FormatterProps,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';

import getEditor from '../getEditor';

const getBaseProps = (
  formatter: ComponentType<FormatterProps<GridRow>>,
  HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>,
  type: TableEntities = TableEntities.NONE,
): BaseProps => ({
  formatter,
  headerRenderer: HeaderRenderer,
  ...getEditor(type),
});

export default getBaseProps;
