import React, { Component, useMemo } from 'react';
import { MenuItem } from 'react-contextmenu';
import { ContextMenu } from 'components/ContextMenu';
import {
  IconArrowLeft,
  IconArrowRight,
  IconEye,
  IconFunnel,
  IconTrash,
  usePortalRender,
} from '@gpn-prototypes/vega-ui';
import { ContextHandler } from 'components/types';
import { noop } from 'utils';

interface IProps {
  id: string;
  onDelete: ContextHandler<number>;
  onInsertLeft: ContextHandler<number>;
  onInsertRight: ContextHandler<number>;
  title?: string;
}

const HeaderContextMenu: React.FC<IProps> = ({
                                               id,
                                               onDelete,
                                               onInsertLeft,
                                               onInsertRight
                                             }) => {
  const items = useMemo(
    () => [
      {
        id: 'header:filter_and_sort',
        title: 'Фильтр и сортировка',
        onClick: noop,
        Icon: IconFunnel,
        disabled: true
      },
      {
        id: 'header:add_left',
        title: 'Добавить столбец слева',
        onClick: onInsertLeft,
        Icon: IconArrowLeft
      },
      {
        id: 'header:add_right',
        title: 'Добавить столбец справа',
        onClick: onInsertRight,
        Icon: IconArrowRight
      },
      {
        id: 'header:hide',
        title: 'Скрыть столбец',
        onClick: noop,
        Icon: IconEye,
        disabled: true
      },
      {
        id: 'header:pin',
        title: 'Закрепить столбец',
        onClick: noop,
        disabled: true
      },
      {
        id: 'header:rename',
        title: 'Переименовать',
        onClick: noop,
        disabled: true
      }
    ],
    [onInsertLeft, onInsertRight]
  );

  const { renderPortalWithTheme } = usePortalRender();

  return renderPortalWithTheme(
    <ContextMenu id={id} ref={contextRef}>
      {items.map(({ title: itemTitle, onClick, Icon, disabled }) => (
        <MenuItem
          key={itemTitle}
          onClick={onClick}
          className={cnMenuItem.toString()}
          disabled={disabled}
        >
          {Icon && <Icon className={cnMenuIcon} size="s" />}
          <span className={cnMenuTitle}>{itemTitle}</span>
        </MenuItem>
      ))}
      <div className={cnContextMenu('Splitter')} />
      <MenuItem onClick={onDelete} className={cnMenuItem.toString()}>
        <IconTrash className={cnMenuIcon} size="s" />
        <span className={cnMenuTitle}>Удалить</span>
      </MenuItem>
    </ContextMenu>,
    document.body
  );
};

export default HeaderContextMenu;
