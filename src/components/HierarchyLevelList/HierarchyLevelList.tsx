import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button, IconAdd, Sidebar } from '@gpn-prototypes/vega-ui';
import arrayMove from 'array-move';
import {
  CategoryIcon,
  TableEntities,
  VisibleKeys,
} from 'components/ExcelTable/enums';
import { ResourceIcon } from 'components/ExcelTable/Icons';
import { GridColumn, VisibilityProperties } from 'components/ExcelTable/types';
import { createColumn } from 'components/ExcelTable/utils';
import { v4 as uuid } from 'uuid';

import { cnHierarchy } from './cn-hierarchy';
import HierarchyLevelItem from './HierarchyLevelItem';
import { Icons } from './types';

import './HierarchyLevelList.css';

interface HierarchyLevelListProps {
  items: GridColumn[];
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (items: GridColumn[]) => void;
  icons?: Icons;
}

const HierarchyLevelList: React.FC<HierarchyLevelListProps> = ({
  items: innerItems,
  icons = {
    [CategoryIcon.FIELD_ICON]: <ResourceIcon className={cnHierarchy('Icon')} />,
  },
  onSubmit,
  isOpen,
  handleClose,
}) => {
  const [items, setItems] = useState(innerItems);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    setItems(arrayMove(items, dragIndex, hoverIndex));
  };

  const moveItemDown = (sourceIndex: number) => {
    const nextIndex = sourceIndex + 1;
    const targetIndex = items[nextIndex] ? nextIndex : 0;

    setItems(arrayMove(items, sourceIndex, targetIndex));
  };

  const moveItemUp = (sourceIndex: number) => {
    const nextIndex = sourceIndex - 1;
    const targetIndex = items[nextIndex] ? nextIndex : items.length - 1;

    setItems(arrayMove(items, sourceIndex, targetIndex));
  };

  const onEdit = (index: number | null) => {
    setEditItemIndex(index);
  };

  const onClickTag = (
    index: number,
    visibleProperty: VisibleKeys,
    isChecked: boolean,
  ) => {
    setItems((prevItems) => {
      const columns = [...prevItems];
      const visibleProps = {
        ...columns[index].visible,
        [visibleProperty]: isChecked,
      } as VisibilityProperties;

      const column = {
        ...columns[index],
        visible: visibleProps,
      };
      columns.splice(index, 1, column);

      return columns;
    });
  };

  const onDelete = (index: number) => {
    setItems((prevState) => {
      const arr = [...prevState];
      arr.splice(index, 1);

      return arr;
    });
  };

  const onAddItem = () => {
    const arr = [
      ...items,
      createColumn({
        key: uuid(),
        type: TableEntities.GEO_CATEGORY,
        name: 'Новый уровень',
        icon: CategoryIcon.FORMATION_ICON,
        isRenaming: false,
      }),
    ];
    setItems(arr);
    onEdit(arr.length - 1);
  };

  const onChangeName = (index: number, name: string) => {
    setItems((prevState) => {
      const arr = [...prevState];
      arr.splice(index, 1, {
        ...items[index],
        name,
      });

      return arr;
    });
  };

  useEffect(() => {
    setItems(innerItems);
  }, [innerItems]);

  return (
    <Sidebar isOpen={isOpen} onClose={handleClose}>
      <Sidebar.Header hasMinimizeButton={false}>
        Настройка уровней иерархии
      </Sidebar.Header>
      <Sidebar.Body>
        <div className={cnHierarchy()}>
          <div className={cnHierarchy('Content')}>
            <DndProvider backend={HTML5Backend}>
              {items.map((item, index) => (
                <HierarchyLevelItem
                  {...item}
                  index={index}
                  icons={icons}
                  key={item.key}
                  moveItemDown={moveItemDown}
                  moveItemUp={moveItemUp}
                  moveItem={moveItem}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onClickTag={onClickTag}
                  canDrag={editItemIndex === null}
                  onChangeName={onChangeName}
                  isEditing={index === editItemIndex}
                />
              ))}
            </DndProvider>
          </div>
          <Button
            label="Добавить уровень иерархии"
            type="button"
            iconLeft={IconAdd}
            view="clear"
            onClick={onAddItem}
          />
          <div className={cnHierarchy('Footer')}>
            <Button
              label="Готово"
              type="button"
              view="primary"
              size="s"
              onClick={() => onSubmit(items)}
            />
          </div>
        </div>
      </Sidebar.Body>
    </Sidebar>
  );
};

export default HierarchyLevelList;
