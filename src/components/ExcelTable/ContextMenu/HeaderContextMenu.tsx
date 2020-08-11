import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import {
    ArrowLeftIcon,
    FilterIcon,
    ArrowRightIcon,
    EyeIcon,
    ThrashIcon,
} from '../Icons'
import './react-context.css'
import styles from './ContextMenu.module.css'

interface IProps {
    id: string
    title: string
    onDelete: Function
    onInsertLeft: Function
    onInsertRight: Function
}

export default React.forwardRef<any, IProps>(function HeaderContextMenu(
    { id, title, onDelete, onInsertLeft, onInsertRight },
    contextRef
) {
    const data = useMemo(
        () => [
            {
                title: 'Фильтр и сортировка',
                onClick: () => {},
                Icon: FilterIcon,
                disabled: true,
            },
            {
                title: 'Добавить столбец слева',
                onClick: onInsertLeft,
                Icon: ArrowLeftIcon,
            },

            {
                title: 'Добавить столбец справа',
                onClick: onInsertRight,
                Icon: ArrowRightIcon,
            },
            {
                title: 'Скрыть столбец',
                onClick: () => {},
                Icon: EyeIcon,
                disabled: true,
            },
            {
                title: 'Закрепить столбец',
                onClick: () => {},
                disabled: true,
            },
            {
                title: 'Переименовать',
                onClick: () => {},
                disabled: true,
            },
        ],
        [onInsertLeft, onInsertRight]
    )

    return createPortal(
        <ContextMenu id={id} hideOnLeave ref={contextRef}>
            {data.map(({ title, onClick, Icon, disabled }, index) => (
                <MenuItem
                    key={index}
                    onClick={onClick}
                    className={styles.MenuItem}
                    disabled={disabled}
                >
                    {Icon && <Icon className={styles.Icon} />}
                    <span className={styles.Title}>{title}</span>
                </MenuItem>
            ))}
            <div className={styles.Splitter} />
            <MenuItem onClick={onDelete} className={styles.MenuItem}>
                <ThrashIcon className={styles.Icon} />
                <span className={styles.Title}>Удалить</span>
            </MenuItem>
        </ContextMenu>,
        document.body
    )
})
