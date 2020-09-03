import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { createPortal } from 'react-dom';

import { ContextHandler } from '../types';

import './react-context.css';

interface IProps {
  id: string;
  title: string;
  onDelete: ContextHandler;
  onInsertAbove: ContextHandler;
  onInsertBelow: ContextHandler;
}

export default React.memo<IProps>(function RowContextMenu({
  id,
  onDelete,
  onInsertAbove,
  onInsertBelow,
}) {
  return createPortal(
    <ContextMenu id={id} hideOnLeave>
      <MenuItem onClick={onDelete}>Удалить</MenuItem>
      <MenuItem onClick={onInsertAbove}>Добавить выше</MenuItem>
      <MenuItem onClick={onInsertBelow}>Добавить ниже</MenuItem>
    </ContextMenu>,
    document.body,
  );
});
