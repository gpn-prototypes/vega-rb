export enum DragItemTypes {
  Item = 'Item',
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
}
