import React from 'react'
import classNames from 'classnames'
import { Row, RowRendererProps } from 'react-data-grid'
import { GridRow } from '../types'
import { withContextMenu } from '../ContextMenu'
import styles from './StyledRow.module.css'

export default React.memo<RowRendererProps<GridRow, any>>(function StyledRow(
    props
) {
    const collect = () => ({ rowIdx: props.rowIdx })

    return withContextMenu(
        <Row
            {...props}
            className={classNames(
                styles.Row,
                props.rowIdx % 2 ? styles.RowEven : styles.RowOdd
            )}
        />,
        { id: 'row-context-menu', collect }
    )
})
