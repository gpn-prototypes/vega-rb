import React from 'react'
import { TreeViewIconTypes, TreeViewTypes } from 'model/TreeView'
import {
    TreeFallowIcon,
    TreeSwitchCloseIcon,
    TreeSwitchOpenIcon,
    TreeWellIcon,
} from 'components/icons'

export interface IProps {
    type?: TreeViewTypes | TreeViewIconTypes
}

export default function TreeViewIcon({ type }: IProps) {
    switch (type) {
        case TreeViewTypes.WELL:
            return <TreeWellIcon />
        case TreeViewTypes.FALLOW:
            return <TreeFallowIcon />
        case TreeViewIconTypes.CLOSE:
            return <TreeSwitchCloseIcon />
        case TreeViewIconTypes.OPEN:
            return <TreeSwitchOpenIcon />
        default:
            return null
    }
}
