import React, { CSSProperties } from 'react'
import { mockData } from './data'
import TreeView from './TreeView'

const containerStyles: CSSProperties = {
    width: '220px',
    height: '300px',
}

export default {
    title: 'TreeView',
    component: TreeView,
}

export const Default = () => (
    <div style={containerStyles}>
        <TreeView treeData={mockData} />
    </div>
)
