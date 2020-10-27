import React, { useMemo } from 'react';
import { MenuItem } from 'react-contextmenu';
import { ContextMenu } from 'components/ContextMenu';
import {
  cnMenuIcon,
  cnMenuItem,
  cnMenuTitle,
} from 'components/ContextMenu/cn-context-menu';
import { EyeIcon } from 'components/ExcelTable/Icons';
import { ContextHandler } from 'components/types';
import { Conception, NoopFunction } from 'types';
import { noop } from 'utils';

import { IMenuItem } from '../types';

interface IProps {
  id: string;
  onDelete: ContextHandler<Conception>;
  onSetProbability: NoopFunction;
  onShowDescription: NoopFunction;
  isDeletable?: boolean;
}

export default React.memo<IProps>(function ConceptionContextMenu({
  id,
  onDelete,
  onSetProbability,
  isDeletable,
  onShowDescription,
}) {
  const items = useMemo<IMenuItem[]>(
    () => [
      {
        id: 'conceptions:set_probability',
        title: 'Задать вероятность',
        onClick: onSetProbability,
      },
      {
        id: 'conceptions:edit',
        title: 'Редактировать',
        onClick: noop,
      },
      {
        id: 'conceptions:look_description',
        title: 'Просмотреть описание',
        onClick: onShowDescription,
      },
      {
        id: 'conception:copy',
        title: 'Создать копию',
        onClick: noop,
        Icon: EyeIcon,
      },
    ],
    [onSetProbability, onShowDescription],
  );

  return (
    <ContextMenu id={id} hideOnLeave>
      {items.map(({ title: itemTitle, onClick, Icon, disabled }) => (
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
      {isDeletable && (
        <MenuItem className={cnMenuItem.toString()} onClick={onDelete}>
          <span className={cnMenuTitle}>Удалить концепцию</span>
        </MenuItem>
      )}
    </ContextMenu>
  );
});
