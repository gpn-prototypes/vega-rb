import React, {
  ComponentType,
  ReactElement,
  ReactText,
  useRef,
  useState,
} from 'react';
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd';
import { Tooltip } from '@gpn-prototypes/vega-ui';
import classNames from 'classnames';
import { cnCellTooltip } from 'components/ExcelTable/cn-excel-table';
import {
  GridColumn,
  HeaderRendererProps,
  TableEntities,
} from 'components/ExcelTable/types';
import { useCombinedRefs } from 'hooks';

import styles from '../Header.module.css';

interface ColumnDragObject extends DragObjectWithType {
  key: string;
  name: ReactText;
}

interface IProps {
  column: GridColumn;
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
  onDoubleClick: () => void;
  editor: ComponentType | ReactElement;
  className?: string;
  precedingContent?: ComponentType | ReactElement;
}

type DraggableHeaderProps = IProps & HeaderRendererProps;

export function DraggableHeader({
  onColumnsReorder,
  onDoubleClick,
  editor,
  className = '',
  precedingContent,
  ...props
}: DraggableHeaderProps): JSX.Element {
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

  const innerRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs<HTMLDivElement>(innerRef, drag, drop);

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const hasError = !!props.column.error;
  const errorMessage = props.column.error?.message;

  return (
    <>
      {isTooltipVisible && (
        <Tooltip
          anchorRef={combinedRef}
          size="s"
          className={cnCellTooltip.toString()}
        >
          {errorMessage}
        </Tooltip>
      )}
      <div
        ref={combinedRef}
        className={classNames(
          className,
          styles.Root,
          isDragging && styles.IsDragging,
          isOver && styles.IsOver,
          hasError && styles.Error,
        )}
        onMouseEnter={() => {
          if (hasError) setIsTooltipVisible(true);
        }}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onDoubleClick={onDoubleClick}
      >
        {precedingContent}
        <div className={styles.WrapperText}>
          {isRenaming ? editor : <span>{name}</span>}
        </div>
      </div>
    </>
  );
}
