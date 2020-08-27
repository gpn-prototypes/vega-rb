import React, { ComponentType, ReactElement } from 'react'
import classNames from 'classnames'
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd'
import { HeaderRendererProps } from 'react-data-grid'
import { IGridColumn, TableEntities } from '../types'
import styles from './DraggableHeader.module.css'

interface IProps {
    column: IGridColumn
    onColumnsReorder: (sourceKey: string, targetKey: string) => void
    onDoubleClick: () => void
    editor: ComponentType | ReactElement
    className?: string
    beforeContent?: ComponentType | ReactElement
}

interface ColumnDragObject extends DragObjectWithType {
    key: string
    name: any
}

function wrapRefs<T>(...refs: React.Ref<T>[]) {
    return (handle: T | null) => {
        for (const ref of refs) {
            if (typeof ref === 'function') {
                ref(handle)
            } else if (ref !== null) {
                ;(ref as React.MutableRefObject<T | null>).current = handle
            }
        }
    }
}

export function DraggableHeader<R>({
    onColumnsReorder,
    onDoubleClick,
    editor,
    beforeContent,
    className,
    ...props
}: IProps & HeaderRendererProps<R>) {
    const { isRenaming, name } = props.column
    const columnType = props.column?.type || TableEntities.NONE

    const [{ isDragging }, drag] = useDrag({
        item: { key: props.column.key, type: columnType, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{ isOver }, drop] = useDrop({
        accept: [TableEntities.GEO_CATEGORY, TableEntities.CALC_PARAM],
        canDrop: (item, monitor) => item.type === columnType,
        drop: ({ key, type, name }: ColumnDragObject) => {
            onColumnsReorder(key, props.column.key)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    return (
        <div
            ref={wrapRefs(drag, drop)}
            className={classNames(
                className,
                styles.Root,
                isDragging && styles.IsDragging,
                isOver && styles.IsOver
            )}
        >
            {beforeContent}
            <div className={styles.WrapperText} onDoubleClick={onDoubleClick}>
                {isRenaming ? editor : <span>{name}</span>}
            </div>
        </div>
    )
}
