import React, { ComponentType, ReactElement, ReactText } from 'react';
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';
import {
  GridColumn,
  HeaderRendererProps,
  TableEntities,
} from 'components/ExcelTable/types';
import { Nullable } from 'types';

import styles from '../Header.module.css';

interface ColumnDragObject extends DragObjectWithType {
  key: string;
  name: ReactText;
}

function wrapRefs<T>(...refs: React.Ref<T>[]) {
  return (handle: Nullable<T>): void => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(handle);
      } else if (ref !== null) {
        // eslint-disable-next-line no-param-reassign
        (ref as React.MutableRefObject<Nullable<T>>).current = handle;
      }
    });
  };
}

interface IProps {
  column: GridColumn;
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
  onDoubleClick: () => void;
  editor: ComponentType | ReactElement;
  className?: string;
  beforeContent?: ComponentType | ReactElement;
}

export function DraggableHeader({
  onColumnsReorder,
  onDoubleClick,
  editor,
  className = '',
  beforeContent,
  ...props
}: IProps & HeaderRendererProps): JSX.Element {
  const { isRenaming, name } = props.column;
  const columnType = props.column?.type || TableEntities.NONE;

  const [{ isDragging }, drag] = useDrag({
    item: { key: props.column.key, type: columnType, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: [TableEntities.GEO_CATEGORY, TableEntities.CALC_PARAM],
    canDrop: (item) => item.type === columnType,
    drop: ({ key }: ColumnDragObject) => {
      onColumnsReorder(key, props.column.key);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={wrapRefs(drag, drop)}
      className={classNames(
        className,
        styles.Root,
        isDragging && styles.IsDragging,
        isOver && styles.IsOver,
      )}
      onDoubleClick={onDoubleClick}
    >
      {beforeContent}
      <div className={styles.WrapperText}>
        {isRenaming ? editor : <span>{name}</span>}
      </div>
    </div>
  );
}
