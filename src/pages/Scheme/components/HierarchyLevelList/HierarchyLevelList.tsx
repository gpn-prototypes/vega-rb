import React, { RefObject, useMemo, useRef, useState } from 'react';
import { DndProvider, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragSourceMonitor } from 'react-dnd/lib/interfaces/monitors';
import { Button } from '@gpn-prototypes/vega-button';
import {
  IconAdd,
  IconArrowDown,
  IconArrowUp,
  IconCheck,
  IconEdit,
  IconHamburger,
  IconKebab,
  IconTrash,
} from '@gpn-prototypes/vega-icons';
import { Popover } from '@gpn-prototypes/vega-popover';
import { Tag } from '@gpn-prototypes/vega-tag';
import arrayMove from 'array-move';
import { ResourceIcon } from 'components/ExcelTable/Icons';
import {
  CategoryIcon,
  GridColumn,
  TableEntities,
} from 'components/ExcelTable/types';
import { XYCoord } from 'dnd-core';
import uniqueId from 'lodash/uniqueId';
import ContentEditableField from 'pages/Scheme/components/HierarchyLevelList/components/ContentEditable/ContentEditable';

import { cnHierarchyLevelList } from './cn-hierarchy-level-list';

import './HierarchyLevelList.css';

const tags = {
  calculation: {
    title: 'Расчет',
  },
  tree: {
    title: 'Дерево',
  },
  table: {
    title: 'Таблица',
  },
};

enum DragItemTypes {
  Item = 'Item',
}

enum VisibleKeys {
  calculation = 'calculation',
  table = 'table',
  tree = 'tree',
}

interface HierarchyLevelItemProps {
  name: string;
  icon: string;
  index: number;
  visible: {
    calculation: boolean;
    table: boolean;
    tree: boolean;
  };
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  moveItemDown: (index: number) => void;
  moveItemUp: (index: number) => void;
  onClickMenu: (ref: RefObject<HTMLDivElement>) => void;
  onDelete: (index: number) => void;
  onClickTag: (index: number, key: VisibleKeys, value: boolean) => void;
  onChangeName: (index: number, value: string) => void;
  onEdit: (index: number | null) => void;
  isEditing: boolean;
  canDrag: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const HierarchyLevelItem: React.FC<HierarchyLevelItemProps> = ({
  name,
  icon,
  index,
  visible,
  moveItem,
  moveItemUp,
  moveItemDown,
  onDelete,
  onChangeName,
  onClickTag,
  canDrag,
  onEdit,
  isEditing,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const contextRef = useRef(null);
  const [value, setValue] = useState(name);
  const [isShowContextMenu, setIsShowContextMenu] = useState(false);
  const openContextMenu = () => setIsShowContextMenu(true);
  const closeContextMenu = () => setIsShowContextMenu(false);
  const [{ isOver }, drop] = useDrop({
    accept: DragItemTypes.Item,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DragItemTypes.Item, name, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag,
  });
  preview(drop(ref));
  return (
    <div
      className={cnHierarchyLevelList('Item').state({
        dragging: isDragging,
        over: isOver,
        editing: isEditing,
      })}
      ref={ref}
    >
      <div
        className={cnHierarchyLevelList('Item', 'DndControl').state({
          editing: !canDrag,
        })}
        ref={drag}
      >
        <IconHamburger />
      </div>
      <div className={cnHierarchyLevelList('Item', 'Body')}>
        <div className={cnHierarchyLevelList('Item', 'Title')}>
          <ResourceIcon color="#00eeaa" />
          <ContentEditableField
            value={value}
            disabled={!isEditing}
            onChange={(newName) => setValue(newName)}
            className={cnHierarchyLevelList(
              'Item',
              'Title',
              'Input',
            ).toString()}
          />
        </div>
        <div className={cnHierarchyLevelList('Item', 'Options')}>
          {(Object.keys(visible) as VisibleKeys[]).map((key) => (
            <Tag
              key={key}
              label={tags[key].title}
              mode="check"
              size="m"
              checked={visible[key]}
              icon={visible[key] ? IconCheck : undefined}
              onChange={() => onClickTag(index, key, !visible[key])}
            />
          ))}
        </div>
      </div>
      {isEditing ? (
        <div className={cnHierarchyLevelList('Item', 'Buttons')}>
          <Button
            label="Готово"
            type="button"
            view="primary"
            size="xs"
            onClick={() => {
              onChangeName(index, value);
              onEdit(null);
            }}
          />
          <Button
            size="xs"
            view="ghost"
            onlyIcon
            iconLeft={IconTrash}
            onClick={() => {
              onDelete(index);
              onEdit(null);
            }}
          />
        </div>
      ) : (
        <div className={cnHierarchyLevelList('Item', 'Controls')}>
          <Button
            size="xs"
            view="clear"
            onlyIcon
            iconLeft={IconKebab}
            ref={contextRef}
            onClick={openContextMenu}
          />
          {isShowContextMenu && (
            <Popover
              anchorRef={contextRef}
              direction="downLeft"
              style={{
                zIndex: 100,
                background: 'rgb(34,39,43)',
              }}
              onClickOutside={closeContextMenu}
            >
              <HierarchyLevelItemContextMenu
                index={index}
                title={name}
                onEdit={() => {
                  onEdit(index);
                  closeContextMenu();
                }}
                onDelete={() => {
                  onDelete(index);
                  closeContextMenu();
                }}
              />
            </Popover>
          )}
          <div className={cnHierarchyLevelList('Item', 'Controls', 'Order')}>
            <Button
              size="xs"
              view="clear"
              onlyIcon
              iconLeft={IconArrowUp}
              onClick={() => moveItemUp(index)}
            />
            <Button
              size="xs"
              view="clear"
              onlyIcon
              iconLeft={IconArrowDown}
              onClick={() => moveItemDown(index)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface HierarchyLevelItemContextMenuProps {
  index: number;
  title: string;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const HierarchyLevelItemContextMenu: React.FC<HierarchyLevelItemContextMenuProps> = ({
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

export interface HierarchyLevelItem extends GridColumn {
  icon: string;
  visible: {
    calculation: boolean;
    table: boolean;
    tree: boolean;
  };
}

interface HierarchyLevelListProps {
  items: HierarchyLevelItem[];
  onSubmit: (items: HierarchyLevelItem[]) => void;
}

const HierarchyLevelList: React.FC<HierarchyLevelListProps> = ({
  items: innerItems,
  onSubmit,
}) => {
  const [items, setItems] = useState(innerItems);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    setItems(arrayMove(items, dragIndex, hoverIndex));
  };
  const moveItemDown = (index: number) => {
    const nextIndex = items[index + 1] ? index + 1 : 0;

    setItems(arrayMove(items, index, nextIndex));
  };
  const moveItemUp = (index: number) => {
    const nextIndex = items[index - 1] ? index - 1 : items.length - 1;

    setItems(arrayMove(items, index, nextIndex));
  };
  const onClickMenu = () => {};
  const onEdit = (index: number | null) => {
    setEditItemIndex(index);
  };
  const onClickTag = (index: number, key: VisibleKeys, bool: boolean) => {
    const arr = [...items];
    arr.splice(index, 1, {
      ...arr[index],
      visible: {
        ...arr[index].visible,
        [key]: bool,
      },
    } as HierarchyLevelItem);
    setItems(arr);
  };
  const onDelete = (index: number) => {
    const arr = [...items];
    arr.splice(index, 1);
    setItems(arr);
  };
  const onAddItem = () => {
    const arr = [
      ...items,
      {
        key: uniqueId(),
        type: TableEntities.GEO_CATEGORY,
        name: 'Новый уровень',
        icon: CategoryIcon.FORMATION_ICON,
        visible: {
          calculation: true,
          table: true,
          tree: true,
        },
      },
    ];
    setItems(arr);
    onEdit(arr.length - 1);
  };
  const onChangeName = (index: number, name: string) => {
    const arr = [...items];
    arr.splice(index, 1, {
      ...items[index],
      name,
    });
    setItems(arr);
  };
  return (
    <div className={cnHierarchyLevelList()}>
      <div className={cnHierarchyLevelList('Content')}>
        <DndProvider backend={HTML5Backend}>
          {items.map((item, index) => (
            <HierarchyLevelItem
              {...item}
              index={index}
              // eslint-disable-next-line
              key={item.key}
              moveItemDown={moveItemDown}
              moveItemUp={moveItemUp}
              moveItem={moveItem}
              onClickMenu={onClickMenu}
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
      <div className={cnHierarchyLevelList('Footer')}>
        <Button
          label="Готово"
          type="button"
          view="primary"
          size="s"
          onClick={() => onSubmit(items)}
        />
      </div>
    </div>
  );
};

export default HierarchyLevelList;
