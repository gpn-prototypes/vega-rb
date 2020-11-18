import React, { ReactElement } from 'react';
import { withContextMenu } from 'components/ExcelTable/ContextMenu';
import {
  CALCULATION_PARAMS_HEADER_CONTEXT_ID,
  HEADER_CONTEXT_ID,
  HeaderRendererProps,
  TableEntities,
} from 'components/ExcelTable/types';

import Header from './Header';

export const HeaderWithContextMenu = (
  props: HeaderRendererProps,
): ReactElement => {
  return withContextMenu(<Header {...props} />, {
    id:
      props.column.type === TableEntities.CALC_PARAM
        ? CALCULATION_PARAMS_HEADER_CONTEXT_ID
        : HEADER_CONTEXT_ID,
    collect: () => ({ idx: props.column.idx }),
  });
};
