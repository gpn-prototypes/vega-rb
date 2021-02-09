import React, { Component, useMemo } from 'react';
import { ContextMenu, ContextMenuProps, MenuItem } from 'react-contextmenu';
import {
  IconArrowLeft,
  IconArrowRight,
  IconEye,
  IconFunnel,
  IconTrash,
  usePortalRender,
} from '@gpn-prototypes/vega-ui';
import { noop } from 'utils';

import { ContextHandler } from '../types';

import { cnContextMenu } from './cn-context-menu';

import './react-context.css';
import './ContextMenu.css';

const cnMenuItem = cnContextMenu('Item');
const cnMenuIcon = cnContextMenu('Icon').toString();
const cnMenuTitle = cnContextMenu('Title');

interface IProps {
  id: string;
  onDelete: ContextHandler;
  onInsertLeft: ContextHandler;
  onInsertRight: ContextHandler;
  title?: string;
}

export default React.forwardRef<Component<ContextMenuProps>, IProps>(
  function HeaderContextMenu(props, contextRef) {
    const { id, onDelete, onInsertLeft, onInsertRight } = props;

    const data = useMemo(
      () => [
        {
          title: 'Фильтр и сортировка',
          onClick: noop,
          Icon: IconFunnel,
          disabled: true,
        },
        {
          title: 'Добавить столбец слева',
          onClick: onInsertLeft,
          Icon: IconArrowLeft,
        },

        {
          title: 'Добавить столбец справа',
          onClick: onInsertRight,
          Icon: IconArrowRight,
        },
        {
          title: 'Скрыть столбец',
          onClick: noop,
          Icon: IconEye,
          disabled: true,
        },
        {
          title: 'Закрепить столбец',
          onClick: noop,
          disabled: true,
        },
        {
          title: 'Переименовать',
          onClick: noop,
          disabled: true,
        },
      ],
      [onInsertLeft, onInsertRight],
    );

    const { renderPortalWithTheme } = usePortalRender();

    return renderPortalWithTheme(
      <ContextMenu id={id} ref={contextRef} hideOnLeave>
        {data.map(({ title: itemTitle, onClick, Icon, disabled }) => (
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
      document.body,
    );
  },
);
