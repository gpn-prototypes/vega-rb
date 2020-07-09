import React, { ReactElement } from 'react'
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd'
import { HeaderRendererProps } from 'react-data-grid'
import { ResourceIcon } from '../Icons'
import { GridColumn } from '../types'
import styles from './DraggableHeader.module.css'

interface IProps {
    column: GridColumn
    onColumnsReorder: (sourceKey: string, targetKey: string) => void
    onDoubleClick: () => void
    editor: ReactElement
}

interface ColumnDragObject extends DragObjectWithType {
    key: string
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
    ...props
}: IProps & HeaderRendererProps<R>) {
    const { isRenaming, name } = props.column

    const [{ isDragging }, drag] = useDrag({
        item: { key: props.column.key, type: 'COLUMN_DRAG' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{ isOver }, drop] = useDrop({
        accept: 'COLUMN_DRAG',
        drop({ key, type }: ColumnDragObject) {
            if (type === 'COLUMN_DRAG') {
                onColumnsReorder(key, props.column.key)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    return (
        <div
            ref={wrapRefs(drag, drop)}
            className={styles.Root}
            style={{
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: isOver ? 'rgba(0, 150, 235, 0.4)' : 'inherit',
                cursor: 'move',
            }}
        >
            <div className={styles.WrapperIcon}>
                <ResourceIcon color={'#00EEAA'} className={styles.Icon} />
            </div>
            <div className={styles.WrapperText} onDoubleClick={onDoubleClick}>
                {isRenaming ? editor : <span>{name}</span>}
            </div>
        </div>
    )
}
