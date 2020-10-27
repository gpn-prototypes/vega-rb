import React from 'react';
import { MenuItem } from 'react-contextmenu';
import { usePortalRender } from '@gpn-prototypes/vega-ui';
import { ContextMenu } from 'components/ContextMenu';
import { ContextHandler } from 'components/types';

interface IProps {
  id: string;
  title: string;
  onDelete: ContextHandler<number>;
  onInsertAbove: ContextHandler<number>;
  onInsertBelow: ContextHandler<number>;
}

export default React.memo<IProps>(function RowContextMenu({
  id,
  onDelete,
  onInsertAbove,
  onInsertBelow,
}) {
  const { renderPortalWithTheme } = usePortalRender();

  return renderPortalWithTheme(
    <ContextMenu id={id} hideOnLeave>
      <MenuItem onClick={onDelete}>Удалить</MenuItem>
      <MenuItem onClick={onInsertAbove}>Добавить выше</MenuItem>
      <MenuItem onClick={onInsertBelow}>Добавить ниже</MenuItem>
    </ContextMenu>,
    document.body,
  );
});
