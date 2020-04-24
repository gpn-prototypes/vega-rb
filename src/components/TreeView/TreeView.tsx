import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import Tree from 'rc-tree'
import { Key } from 'rc-tree/lib/interface'
import { ITreeViewNode, TreeViewIconTypes } from 'model/TreeView'
import TreeViewRow from './TreeViewRow'
import TreeViewIcon from './TreeViewIcon'
import styles from './TreeView.module.css'
import './TreeView.css'

function wrapSwitcher(component: JSX.Element) {
    return (
        <>
            <span className={styles.switchIconWrapper}>{component}</span>
            <span
                className={classNames(
                    'rc-tree-indent',
                    styles.openedLineWrapper
                )}
            >
                <span className="rc-tree-indent-unit rc-tree-indent-unit-start" />
            </span>
        </>
    )
}

interface IProps {
    treeData: ITreeViewNode[]
}

export default React.memo<IProps>(function TreeView({ treeData }) {
    const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
    const [autoExpandParent, setAutoExpandParent] = useState(true)

    const onExpand = (expandedKeys: Key[]) => {
        setExpandedKeys(expandedKeys)
        setAutoExpandParent(false)
    }

    const onHide = (id: string) => {
        // eslint-disable-next-line no-console
        console.log('Hide/show btn clicked at', id)
    }

    const collectTreeMap = useCallback(
        (data: ITreeViewNode[]): any[] =>
            data.map((node) => ({
                ...node,
                title: (
                    <TreeViewRow
                        title={node.title}
                        onHide={() => onHide(node.key)}
                    />
                ),
                icon: node.type && <TreeViewIcon type={node.type} />,
                children: node.children ? collectTreeMap(node.children) : [],
            })),
        []
    )
    const nodes = useCallback(() => collectTreeMap(treeData), [
        collectTreeMap,
        treeData,
    ])

    const switcherIcon = useCallback(
        (status = false) =>
            status ? (
                wrapSwitcher(<TreeViewIcon type={TreeViewIconTypes.CLOSE} />)
            ) : (
                <TreeViewIcon type={TreeViewIconTypes.OPEN} />
            ),
        []
    )

    return (
        <div className={styles.root}>
            <Tree
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onExpand={onExpand}
                draggable
                defaultExpandAll
                showLine
                virtual
                switcherIcon={({ isLeaf, expanded }) =>
                    !isLeaf && switcherIcon(expanded)
                }
                treeData={nodes()}
            />
        </div>
    )
})
