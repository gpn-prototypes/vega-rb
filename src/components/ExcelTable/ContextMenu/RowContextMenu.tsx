import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { IconTrash, usePortalRender } from '@gpn-prototypes/vega-ui';

import { ContextHandler, RowContextBody } from '../types';

import { cnContextMenu } from './cn-context-menu';

import './react-context.css';

interface IProps {
  id: string;
  onDelete: ContextHandler<RowContextBody>;
  onInsertAbove: ContextHandler<RowContextBody>;
  onInsertBelow: ContextHandler<RowContextBody>;
}

export default React.memo<IProps>(function RowContextMenu({ id, onDelete }) {
  const { renderPortalWithTheme } = usePortalRender();

  return renderPortalWithTheme(
    <ContextMenu id={id} hideOnLeave>
      <MenuItem onClick={onDelete} className={cnContextMenu('Item').toString()}>
        <IconTrash className={cnContextMenu('Icon').toString()} size="s" />
        <span className={cnContextMenu('Title')}>Удалить</span>
      </MenuItem>
    </ContextMenu>,
    document.body,
  );
});
