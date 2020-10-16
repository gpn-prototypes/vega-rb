import React, { ReactText } from 'react';
import { Column } from 'react-data-grid';
import { FormatterProps as BaseFormatterProps } from 'react-data-grid/lib/common/types';
import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';

export const HEADER_CONTEXT_ID = 'header-context-menu';

export enum CategoryIcon {
  LICENSING_ROUND_ICON = 'LICENSING_ROUND_ICON',
  FIELD_ICON = 'FIELD_ICON',
  FORMATION_ICON = 'FORMATION_ICON',
  OIL_POOL_ICON = 'OIL_POOL_ICON',
  WELL_ICON = 'WELL_ICON',
}

export type SelectedCell = {
  rowIdx: number;
  row: GridRow;
  column: IGridColumn;
};

export enum TableEntities {
  GEO_CATEGORY = 'DomainEntity',
  CALC_PARAM = 'Attribute',
  RISK = 'Risk',
  ID = 'ID',
  SPLITTER = 'Splitter',
  NONE = 'None',
}

export interface GridCellParameters {
  value: number;
  type: DistributionParameterTypes;
}

interface GridCellArguments {
  definition: DistributionDefinitionTypes;
  type: DistributionTypes;
  parameters: GridCellParameters[];
}

export interface GridCellProperties {
  value: ReactText;
  args?: GridCellArguments;
}

export interface GridRow {
  [key: string]: GridCellProperties | undefined;
}

export interface IGridColumn extends Column<GridRow> {
  type?: TableEntities;
  hasIcon?: boolean;
  isRenaming?: boolean;
  before?: JSX.Element;
  headerId?: string;
  notRemovable?: boolean;
}

export interface GridCollection {
  columns: IGridColumn[];
  rows: GridRow[];
}

export type ContextHandler = (
  e: React.MouseEvent<HTMLDivElement>,
  { idx }: { idx: number },
) => void;

export type FormatterProps<T> = BaseFormatterProps<T> & { value?: string };
