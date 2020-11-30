import React, { useRef, useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { DragSourceMonitor } from 'react-dnd/lib/interfaces/monitors';
import {
  Button,
  IconArrowDown,
  IconArrowUp,
  IconCheck,
  IconHamburger,
  IconKebab,
  IconTrash,
  Popover,
  Tag,
} from '@gpn-prototypes/vega-ui';
import {
  CategoryIcon,
  VisibilityProperties,
  VisibleKeys,
} from 'components/ExcelTable/types';

import { cnHierarchyLevelList } from '../../cn-hierarchy-level-list';
import { Icons } from '../../types';
import ContentEditableField from '../ContentEditable';
import HierarchyLevelItemContextMenu from '../HierarchyLevelListItemContextMenu';

import { DragItemTypes } from './types';

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

interface HierarchyLevelItemProps {
  name: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  moveItemDown: (index: number) => void;
  moveItemUp: (index: number) => void;
  onDelete: (index: number) => void;
  onClickTag: (index: number, key: VisibleKeys, value: boolean) => void;
  onChangeName: (index: number, value: string) => void;
  onEdit: (index: number | null) => void;
  isEditing: boolean;
  canDrag: boolean;
  iconId?: CategoryIcon;
  icons?: Icons;
  visible?: VisibilityProperties;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const HierarchyLevelItem: React.FC<HierarchyLevelItemProps> = ({
  name,
  iconId = CategoryIcon.FIELD_ICON,
  icons,
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

      if (dragIndex === index) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < index && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > index && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, index);

      // eslint-disable-next-line no-param-reassign
      item.index = index;
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

  const renderEditActions = () => {
    return (
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
    );
  };
  const renderSettingsActions = () => {
    return (
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
    );
  };
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
          {iconId && icons ? icons[iconId] : null}
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
          {visible &&
            (Object.keys(visible) as VisibleKeys[]).map((key) => (
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
      {isEditing ? renderEditActions() : renderSettingsActions()}
    </div>
  );
};

export default HierarchyLevelItem;
