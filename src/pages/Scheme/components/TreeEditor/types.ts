import { RefObject } from 'react';

export type TargetData = {
  ref: RefObject<HTMLElement> | null;
  id: string;
  isDraggable: boolean;
};

export type FilterState = {
  rows: number[];
  columns: string[];
};

export type CellPosition = {
  rowIdx: number;
  columnIdx: number;
};

export type TreeItemData = {
  position: CellPosition[];
};
