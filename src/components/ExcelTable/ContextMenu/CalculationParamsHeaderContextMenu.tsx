import React, { Component, useMemo } from 'react';
import { ContextMenu, ContextMenuProps, MenuItem } from 'react-contextmenu';
import { usePortalRender } from '@gpn-prototypes/vega-ui';
import { noop } from 'utils';

import { EyeIcon, FilterIcon, ThrashIcon } from '../Icons';
import { ContextHandler } from '../types';

import { cnContextMenu } from './cn-context-menu';

import './react-context.css';
import './ContextMenu.css';

const cnMenuItem = cnContextMenu('Item');
const cnMenuIcon = cnContextMenu('Icon');
const cnMenuTitle = cnContextMenu('Title');

interface IProps {
  id: string;
  onDelete: ContextHandler;
  title?: string;
}

export default React.forwardRef<Component<ContextMenuProps>, IProps>(
  function HeaderContextMenu({ id, onDelete }, contextRef) {
    const data = useMemo(
      () => [
        {
          title: 'Фильтр и сортировка',
          onClick: noop,
          Icon: FilterIcon,
          disabled: true,
        },
        {
          title: 'Скрыть столбец',
          onClick: noop,
          Icon: EyeIcon,
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
      [],
    );

    const { renderPortalWithTheme } = usePortalRender();

    return renderPortalWithTheme(
      <ContextMenu id={id} ref={contextRef}>
        {data.map(({ title: itemTitle, onClick, Icon, disabled }) => (
          <MenuItem
            key={itemTitle}
            onClick={onClick}
            className={cnMenuItem.toString()}
            disabled={disabled}
          >
            {Icon && <Icon className={cnMenuIcon} />}
            <span className={cnMenuTitle}>{itemTitle}</span>
          </MenuItem>
        ))}
        <div className={cnContextMenu('Splitter')} />
        <MenuItem onClick={onDelete} className={cnMenuItem.toString()}>
          <ThrashIcon className={cnMenuIcon} />
          <span className={cnMenuTitle}>Удалить</span>
        </MenuItem>
      </ContextMenu>,
      document.body,
    );
  },
);
