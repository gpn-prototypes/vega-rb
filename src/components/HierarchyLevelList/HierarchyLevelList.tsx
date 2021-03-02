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
import { createColumn } from 'components/ExcelTable/utils';
import { set } from 'lodash/fp';
import { v4 as uuid } from 'uuid';

import { cnHierarchy } from './cn-hierarchy';
import { HierarchyLevelItem } from './HierarchyLevelItem';
import { HierarchyLevelListProps } from './types';

import './HierarchyLevelList.css';

export const testId = {
  list: 'HierarchyLevelList:list',
};

const HierarchyLevelList: React.FC<HierarchyLevelListProps> = ({
  items: innerItems,
  icons,
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
    setItems((prevItems) =>
      set([index, 'visible', visibleProperty], isChecked, prevItems),
    );
  };

  const onDelete = (index: number) => {
    setItems((prevState) => prevState.filter((v, idx) => idx === index));
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
    setItems((prevState) => set([index, 'name'], name, prevState));
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
          <div className={cnHierarchy('Content')} data-testid={testId.list}>
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
