import React, { Component, useMemo, useState } from 'react';
import { ContextMenu, ContextMenuProps, MenuItem } from 'react-contextmenu';
import {
  IconArrowLeft,
  IconArrowRight,
  IconEye,
  IconFunnel,
  IconTrash,
  usePortalRender,
} from '@gpn-prototypes/vega-ui';
import { TableEntities } from 'components/ExcelTable/enums';
import { useValidateByColumns } from 'hooks';
import { NoopFunction } from 'types';
import { noop } from 'utils';

import { ColumnContextBody, ContextHandler, GridColumn } from '../types';

import { cnContextMenu } from './cn-context-menu';
import { headerValidatorByTypes } from './validators';

import './react-context.css';
import './ContextMenu.css';

const cnMenuItem = cnContextMenu('Item');
const cnMenuIcon = cnContextMenu('Icon').toString();
const cnMenuTitle = cnContextMenu('Title');

interface IProps {
  id: string;
  onDelete: ContextHandler<ColumnContextBody>;
  onInsertLeft: ContextHandler<ColumnContextBody>;
  onInsertRight: ContextHandler<ColumnContextBody>;
  title?: string;
}

const columnValidator = (columns: GridColumn[]) => (type: TableEntities) =>
  headerValidatorByTypes(columns, type);

export default React.forwardRef<Component<ContextMenuProps>, IProps>(
  function HeaderContextMenu(props, contextRef) {
    const { id, onDelete, onInsertLeft, onInsertRight } = props;

    const [isDeletable, setIsDeletable] = useState(true);
    const { renderPortalWithTheme } = usePortalRender();

    const validator = useValidateByColumns<
      NoopFunction<TableEntities, boolean>
    >(columnValidator);

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

    const onShow = (event: CustomEvent) => {
      const { type } = event.detail.data;
      const validatorResult = validator(type);

      setIsDeletable(validatorResult);
    };

    return renderPortalWithTheme(
      <ContextMenu id={id} ref={contextRef} hideOnLeave onShow={onShow}>
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
        <MenuItem
          onClick={onDelete}
          className={cnMenuItem.toString()}
          disabled={!isDeletable}
        >
          <IconTrash className={cnMenuIcon} size="s" />
          <span className={cnMenuTitle}>Удалить</span>
        </MenuItem>
      </ContextMenu>,
      document.body,
    );
  },
);
