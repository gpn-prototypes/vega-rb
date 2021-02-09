import React, { ReactElement } from 'react';
import { withContextMenu } from 'components/ExcelTable/ContextMenu';
import { ContextMenuId } from 'components/ExcelTable/enums';
import { HeaderRendererProps } from 'components/ExcelTable/types';

import { DefaultHeader as Header } from './DefaultHeader';

export const HeaderWithContextMenu = (
  props: HeaderRendererProps,
): ReactElement =>
  withContextMenu(<Header {...props} />, {
    id: ContextMenuId.HEADER,
    collect: () => ({ idx: props.column.idx }),
  });
