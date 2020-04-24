import React from 'react'
import { TreeEyeIcon } from 'components/icons'
import styles from './TreeViewRow.module.css'

export interface IProps {
    onHide: () => void
    title?: string
}

export default React.memo<IProps>(function TreeViewRow({ title, onHide }) {
    return (
        <>
            <span className={styles.titleRow}>{title}</span>
            <TreeEyeIcon onClick={onHide} />
        </>
    )
})
