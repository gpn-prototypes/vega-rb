import React from 'react';
import {
  HeaderRendererProps,
  TableEntities,
} from 'components/ExcelTable/types';
import { hasContextMenu } from 'components/ExcelTable/utils';

import { DefaultHeader as Header } from './DefaultHeader';
import { HeaderWithContextMenu } from './HeaderWithContextMenu';

export const getHeaderComponent = (
  type: TableEntities = TableEntities.NONE,
):
  | ((props: HeaderRendererProps) => React.ReactElement)
  | React.NamedExoticComponent<HeaderRendererProps> => {
  return hasContextMenu(type) ? HeaderWithContextMenu : Header;
};
