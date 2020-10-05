import React, { Component, useMemo } from 'react';
import { ContextMenu, ContextMenuProps, MenuItem } from 'react-contextmenu';
import { createPortal } from 'react-dom';
import { noop } from 'utils';
import { useTheme } from '@consta/uikit/Theme';
import classNames from 'classnames';

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  FilterIcon,
  ThrashIcon,
} from '../Icons';
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
  onInsertLeft: ContextHandler;
  onInsertRight: ContextHandler;
  title?: string;
}

export default React.forwardRef<Component<ContextMenuProps>, IProps>(
  function HeaderContextMenu(
    { id, onDelete, onInsertLeft, onInsertRight },
    contextRef,
  ) {
    const data = useMemo(
      () => [
        {
          title: 'Фильтр и сортировка',
          onClick: noop,
          Icon: FilterIcon,
          disabled: true,
        },
        {
          title: 'Добавить столбец слева',
          onClick: onInsertLeft,
          Icon: ArrowLeftIcon,
        },

        {
          title: 'Добавить столбец справа',
          onClick: onInsertRight,
          Icon: ArrowRightIcon,
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
      [onInsertLeft, onInsertRight],
    );

    const { themeClassNames } = useTheme();

    return createPortal(
      <ContextMenu
        id={id}
        ref={contextRef}
        className={classNames([
          ...Object.values(themeClassNames),
          themeClassNames.color.primary,
        ])}
      >
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
