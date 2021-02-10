import { NamedExoticComponent, ReactElement } from 'react';
import { TableEntities } from 'components/ExcelTable/enums';
import { HeaderRendererProps } from 'components/ExcelTable/types';
import { hasContextMenu } from 'components/ExcelTable/utils';

import { DefaultHeader as Header } from './DefaultHeader';
import { HeaderWithContextMenu } from './HeaderWithContextMenu';

export const getHeaderComponent = (
  type: TableEntities = TableEntities.NONE,
):
  | ((props: HeaderRendererProps) => ReactElement)
  | NamedExoticComponent<HeaderRendererProps> => {
  return hasContextMenu(type) ? HeaderWithContextMenu : Header;
};
