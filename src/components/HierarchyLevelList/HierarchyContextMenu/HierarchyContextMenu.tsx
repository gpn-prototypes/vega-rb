import React, { useMemo } from 'react';
import { Button, IconEdit, IconTrash } from '@gpn-prototypes/vega-ui';

import { cnHierarchy } from '../cn-hierarchy';

interface IProps {
  index: number;
  title: string;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const HierarchyContextMenu: React.FC<IProps> = ({
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
    <div className={cnHierarchy('Item', 'ContextMenu')}>
      {data.map(({ Icon, title, onClick }) => (
        <Button
          key={title}
          onClick={() => {
            onClick(index);
          }}
          type="button"
          view="clear"
          label={title}
          className={cnHierarchy('Item', 'ContextMenu', 'Item').toString()}
          iconLeft={Icon}
          size="s"
        />
      ))}
    </div>
  );
};

export default HierarchyContextMenu;
