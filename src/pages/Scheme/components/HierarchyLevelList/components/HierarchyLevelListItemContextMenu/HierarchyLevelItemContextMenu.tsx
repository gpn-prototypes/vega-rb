import React, { useMemo } from 'react';
import { Button, IconEdit, IconTrash } from '@gpn-prototypes/vega-ui';

import { cnHierarchyLevelList } from '../../cn-hierarchy-level-list';

interface IProps {
  index: number;
  title: string;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const HierarchyLevelItemContextMenu: React.FC<IProps> = ({
  index,
  onEdit,
  onDelete,
}) => {
  const data = useMemo(
    () => [
      {
        title: 'Редактировать',
        onClick: onEdit,
        Icon: IconEdit,
        disabled: true,
      },
      {
        title: 'Удалить',
        onClick: onDelete,
        Icon: IconTrash,
      },
    ],
    [onEdit, onDelete],
  );
  return (
    <div className={cnHierarchyLevelList('Item', 'ContextMenu')}>
      {data.map(({ Icon, title, onClick }) => (
        <Button
          key={title}
          onClick={() => {
            onClick(index);
          }}
          type="button"
          view="clear"
          label={title}
          className={cnHierarchyLevelList(
            'Item',
            'ContextMenu',
            'Item',
          ).toString()}
          iconLeft={Icon}
          size="s"
        />
      ))}
    </div>
  );
};

export default HierarchyLevelItemContextMenu;
