import React from 'react'
import {
    IGridColumn,
    GridRow,
    HEADER_CONTEXT_ID,
    TableEntities,
} from '../types'
import classNames from 'classnames'
import { HeaderRendererProps } from 'react-data-grid'
import { curry } from 'lodash'
import { withContextMenu } from '../ContextMenu'
import DraggableHeader from '../DraggableHeader'
import {
    columnsFactory,
    columnsReorder,
    onBlurCell,
    setColumnAttributes,
} from '../helpers'
import { ResourceIcon } from '../Icons'
import { InputEditor } from '../Editors'
import styles from '../DraggableHeader/DraggableHeader.module.css'

function HeaderRenderer(
    props: HeaderRendererProps<GridRow> & {
        column: IGridColumn
        setColumnProps: Function
        handleColumnsReorder: (sourceKey: string, targetKey: string) => void
        onBlurHandler: Function
    }
) {
    const {
        column,
        setColumnProps,
        handleColumnsReorder,
        onBlurHandler,
    } = props
    const { name, idx, type, headerId } = column

    return withContextMenu(
        <DraggableHeader
            {...props}
            className={classNames(
                type === TableEntities.CALC_PARAM && styles.CalcParamHeader
            )}
            onColumnsReorder={handleColumnsReorder}
            onDoubleClick={() => {
                setColumnProps(props.column.idx, 'isRenaming', true)
            }}
            editor={
                <InputEditor
                    name={name}
                    idx={idx}
                    setColumnProps={setColumnProps}
                    onBlurHandler={onBlurHandler}
                />
            }
            beforeContent={
                <>
                    {type === TableEntities.GEO_CATEGORY && (
                        <div className={styles.WrapperIcon}>
                            <ResourceIcon
                                color={'#00eeaa'}
                                className={styles.Icon}
                            />
                        </div>
                    )}
                    {type === TableEntities.CALC_PARAM && (
                        <div className={styles.HeaderId}>{headerId}</div>
                    )}
                </>
            }
        />,
        {
            id: HEADER_CONTEXT_ID,
            collect: () => ({ idx: props.column.idx }),
        }
    )
}

const renderColumns = (
    columns: IGridColumn[],
    setColumns: (data: any) => void
) => {
    const setColumnProps = curry(setColumnAttributes)(columns, setColumns)
    const handleColumnsReorder = curry(columnsReorder)(columns, setColumns)
    const onBlurHandler = curry(onBlurCell)(columns, setColumns)

    return columns.map((column) =>
        columnsFactory(column, (props) => (
            <HeaderRenderer
                {...props}
                onBlurHandler={onBlurHandler}
                setColumnProps={setColumnProps}
                handleColumnsReorder={handleColumnsReorder}
            />
        ))
    )
}

export default renderColumns
