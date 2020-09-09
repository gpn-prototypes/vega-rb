import React, { ReactText } from 'react';
import { Column } from 'react-data-grid';

export const HEADER_CONTEXT_ID = 'header-context-menu';

export enum CategoryIcon {
  LICENSING_ROUND_ICON = 'LICENSING_ROUND_ICON',
  FIELD_ICON = 'FIELD_ICON',
  FORMATION_ICON = 'FORMATION_ICON',
  OIL_POOL_ICON = 'OIL_POOL_ICON',
  WELL_ICON = 'WELL_ICON',
}

export enum TableEntities {
  GEO_CATEGORY = 'DomainEntity',
  CALC_PARAM = 'Attribute',
  NONE = 'None',
}

export interface GridRow {
  [key: string]:
    | {
        value: ReactText;
        args?: {
          definition: string;
          type: string;
          parameters: {
            type: string;
            value: string;
          }[];
        };
      }
    | undefined;
}
export interface GridCell {
  id: number;
}

export interface IGridColumn extends Column<GridRow> {
  type?: TableEntities;
  hasIcon?: boolean;
  isRenaming?: boolean;
  before?: JSX.Element;
  headerId?: string;
}

export interface GridCollection {
  columns: IGridColumn[];
  rows: GridRow[];
}

export type ContextHandler = (
  e: React.MouseEvent<HTMLDivElement>,
  { idx }: { idx: number },
) => void;
