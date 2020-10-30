import { ComponentType } from 'react';
import { HeaderRendererProps } from 'react-data-grid';
import {
  BaseProps,
  FormatterProps,
  GridRow,
} from 'components/ExcelTable/types';

const getBaseProps = (
  formatter: ComponentType<FormatterProps<GridRow>>,
  HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>,
): BaseProps => ({
  formatter,
  headerRenderer: HeaderRenderer,
});

export default getBaseProps;
