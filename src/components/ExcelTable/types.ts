import React, { ComponentType, ReactText } from 'react';
import { CalculatedColumn, Column, EditorProps } from 'react-data-grid';
import {
  CellRendererProps,
  FormatterProps as BaseFormatterProps,
  HeaderRendererProps as BaseHeaderRendererProps,
} from 'react-data-grid/lib/common/types';
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
  column: GridColumn;
};

export enum TableEntities {
  GEO_CATEGORY = 'RBDomainEntity',
  CALC_PARAM = 'Attribute',
  GEO_CATEGORY_TYPE = 'GeoObjectType',
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

export interface GridCell {
  selectedCell: SelectedCell;
  cellData: GridCellProperties;
}

export interface GridRow {
  [key: string]: GridCellProperties | undefined;
}

export interface GridColumn extends Column<GridRow> {
  type?: TableEntities;
  hasIcon?: boolean;
  isRenaming?: boolean;
  before?: JSX.Element;
  headerId?: string;
  notRemovable?: boolean;
  cellRenderer?: React.ComponentType<CellRendererProps<GridRow>>;
}

export interface GridCollection {
  columns: GridColumn[];
  rows: GridRow[];
}

export type ContextHandler = (
  e: React.MouseEvent<HTMLDivElement>,
  { idx }: { idx: number },
) => void;

export type FormatterProps<T> = BaseFormatterProps<T> & { value?: string };

export type BaseProps = {
  formatter: ComponentType<FormatterProps<GridRow>>;
  headerRenderer: ComponentType<BaseHeaderRendererProps<GridRow>>;
};

export type UniColumn = CalculatedColumn<GridRow> & GridColumn;

export interface HeaderRendererProps extends BaseHeaderRendererProps<GridRow> {
  column: UniColumn;
  onBlurHandler: (idx: number) => void;
  setColumnProps: (
    columnIdx: number,
    property: keyof GridColumn,
    value: ReactText | boolean,
  ) => void;
  handleColumnsReorder: (sourceKey: string, targetKey: string) => void;
}

export interface DropdownOption {
  id: string;
  value: string;
  text: string;
}

export type EditorResult =
  | { editor: ComponentType<EditorProps<GridCellProperties | undefined>> }
  | { editor: undefined };

export type SetColumnProperty<T> = (
  idx: number,
  property: keyof T,
  value: ReactText | boolean,
) => void;
