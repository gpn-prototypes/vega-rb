import React, { ReactElement } from 'react';
import { withContextMenu } from 'components/ExcelTable/ContextMenu';
import {
  HEADER_CONTEXT_ID,
  HeaderRendererProps,
} from 'components/ExcelTable/types';

import Header from './Header';

export const HeaderWithContextMenu = (
  props: HeaderRendererProps,
): ReactElement =>
  withContextMenu(<Header {...props} />, {
    id: HEADER_CONTEXT_ID,
    collect: () => ({ idx: props.column.idx }),
  });
