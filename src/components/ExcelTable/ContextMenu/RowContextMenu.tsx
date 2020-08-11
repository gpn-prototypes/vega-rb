import React from 'react'
import { createPortal } from 'react-dom'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import './react-context.css'

interface IProps {
    id: string
    title: string
    onDelete: Function
    onInsertAbove: Function
    onInsertBelow: Function
}

export default React.memo<IProps>(function RowContextMenu({
    id,
    title,
    onDelete,
    onInsertAbove,
    onInsertBelow,
}) {
    return createPortal(
        <ContextMenu id={id} hideOnLeave>
            <MenuItem onClick={onDelete}>Удалить</MenuItem>
            <MenuItem onClick={onInsertAbove}>Добавить выше</MenuItem>
            <MenuItem onClick={onInsertBelow}>Добавить ниже</MenuItem>
        </ContextMenu>,
        document.body
    )
})
