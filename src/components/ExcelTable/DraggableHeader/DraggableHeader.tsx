import React, { ComponentType, ReactElement, ReactText } from 'react';
import { HeaderRendererProps } from 'react-data-grid';
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';
import { Nullable } from 'types';

import { IGridColumn, TableEntities } from '../types';

import styles from './DraggableHeader.module.css';

interface IProps {
  column: IGridColumn;
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
  onDoubleClick: () => void;
  editor: ComponentType | ReactElement;
  className?: string;
  beforeContent?: ComponentType | ReactElement;
}

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

export function DraggableHeader<R>({
  onColumnsReorder,
  onDoubleClick,
  editor,
  beforeContent,
  className,
  ...props
}: IProps & HeaderRendererProps<R>): JSX.Element {
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
    >
      {beforeContent}
      <div className={styles.WrapperText} onDoubleClick={onDoubleClick}>
        {isRenaming ? editor : <span>{name}</span>}
      </div>
    </div>
  );
}
