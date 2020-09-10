import React, { Component, useMemo } from 'react';
import { ContextMenu, ContextMenuProps, MenuItem } from 'react-contextmenu';
import { createPortal } from 'react-dom';
import noop from 'utils/noop';

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  FilterIcon,
  ThrashIcon,
} from '../Icons';
import { ContextHandler } from '../types';

import './react-context.css';
import styles from './ContextMenu.module.css';

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

    return createPortal(
      <ContextMenu id={id} hideOnLeave ref={contextRef}>
        {data.map(({ title: itemTitle, onClick, Icon, disabled }) => (
          <MenuItem
            key={itemTitle}
            onClick={onClick}
            className={styles.MenuItem}
            disabled={disabled}
          >
            {Icon && <Icon className={styles.Icon} />}
            <span className={styles.Title}>{itemTitle}</span>
          </MenuItem>
        ))}
        <div className={styles.Splitter} />
        <MenuItem onClick={onDelete} className={styles.MenuItem}>
          <ThrashIcon className={styles.Icon} />
          <span className={styles.Title}>Удалить</span>
        </MenuItem>
      </ContextMenu>,
      document.body,
    );
  },
);
