import { ITreeViewNode, TreeViewTypes } from 'model/TreeView'

export const mockData: ITreeViewNode[] = [
    {
        key: '0-0',
        title: 'Усть-Енисей',
        children: [
            {
                key: '0-0-0',
                title: 'Поднятие 1',
                children: [
                    {
                        key: '0-0-0-0',
                        title: 'Залежь 1',
                        type: TreeViewTypes.FALLOW,
                        children: [
                            {
                                key: '0-0-0-0-0',
                                title: 'Скважина 1',
                                type: TreeViewTypes.WELL,
                            },
                            {
                                key: '0-0-0-0-1',
                                title: 'Скважина 2',
                                type: TreeViewTypes.WELL,
                            },
                            {
                                key: '0-0-0-0-2',
                                title: 'Скважина 3',
                                type: TreeViewTypes.WELL,
                            },
                        ],
                    },
                ],
            },
            {
                key: '0-0-1',
                title: 'Поднятие 2',
                children: [
                    {
                        key: '0-0-1-0',
                        title: 'Залежь 1',
                        type: TreeViewTypes.FALLOW,
                        children: [
                            {
                                key: '0-0-1-0-0',
                                title: 'Скважина 1',
                                type: TreeViewTypes.WELL,
                            },
                            {
                                key: '0-0-1-0-1',
                                title: 'Скважина 2',
                                type: TreeViewTypes.WELL,
                            },
                            {
                                key: '0-0-1-0-2',
                                title: 'Скважина 3',
                                type: TreeViewTypes.WELL,
                            },
                        ],
                    },
                ],
            },
            {
                key: '0-0-2',
                title: 'Поднятие 3',
                children: [
                    {
                        key: '0-0-2-0',
                        title: 'Залежь 1',
                        type: TreeViewTypes.FALLOW,
                        children: [
                            {
                                key: '0-0-2-0-0',
                                title: 'Скважина 1',
                                type: TreeViewTypes.WELL,
                            },
                            {
                                key: '0-0-2-0-1',
                                title: 'Скважина 2',
                                type: TreeViewTypes.WELL,
                            },
                            {
                                key: '0-0-2-0-2',
                                title: 'Скважина 3',
                                type: TreeViewTypes.WELL,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]
