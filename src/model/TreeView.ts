export enum TreeViewTypes {
    WELL = 'Скважина',
    FALLOW = 'Залежь',
    RAISING = 'Поднятие',
}

export enum TreeViewIconTypes {
    OPEN = 'SwitchIconOpen',
    CLOSE = 'SwitchIconClose',
}

export interface ITreeViewNode {
    key: string
    title: string
    type?: TreeViewTypes
    children?: ITreeViewNode[]
}
