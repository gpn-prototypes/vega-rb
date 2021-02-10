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
  GeoObjectCategories,
  RbErrorInterface,
  TableError,
} from 'generated/graphql';

export const HEADER_CONTEXT_ID = 'header-context-menu';

export enum CategoryIcon {
  LICENSING_ROUND_ICON = 'LICENSING_ROUND_ICON',
  FIELD_ICON = 'FIELD_ICON',
  FORMATION_ICON = 'FORMATION_ICON',
  OIL_POOL_ICON = 'OIL_POOL_ICON',
  WELL_ICON = 'WELL_ICON',
}

export type ErrorWrapper = { [index: string]: TableError };

export type ColumnErrors = { [index: string]: ErrorWrapper };

export type SelectedCell = {
  rowIdx: number;
  row: GridRow;
  column: GridColumn;
};

export enum VisibleKeys {
  CALCULATION = 'calc',
  TABLE = 'table',
  TREE = 'tree',
}

export type VisibilityProperties = {
  [key in VisibleKeys]: boolean;
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
  value: ReactText;
  type: DistributionParameterTypes;
}

export interface GridCellArguments {
  type: DistributionTypes;
  definition: DistributionDefinitionTypes;
  parameters: GridCellParameters[];
}

export interface DropDownOption {
  id: string;
  value: GeoObjectCategories;
  text: string;
}

export interface GridCellProperties {
  value: ReactText | DropDownOption;
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
  code?: string;
  icon?: CategoryIcon;
  hasIcon?: boolean;
  isRenaming?: boolean;
  before?: JSX.Element;
  headerId?: string;
  notRemovable?: boolean;
  visible?: VisibilityProperties;
  cellRenderer?: React.ComponentType<CellRendererProps<GridRow>>;
  error?: RbErrorInterface;
}

export interface GridCollection {
  columns: GridColumn[];
  rows: GridRow[];
  errors: ColumnErrors;
  version: number;
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

export type EditorResult =
  | { editor: ComponentType<EditorProps<GridCellProperties | undefined>> }
  | { editor: undefined };

export type ColumnProperties = Partial<
  Record<keyof GridColumn, string | number | boolean>
>;

export type SetColumnProperties = (
  idx: number,
  properties: ColumnProperties,
) => void;

export interface HeaderRendererProps extends BaseHeaderRendererProps<GridRow> {
  column: UniColumn;
  setColumnProps: SetColumnProperties;
  handleColumnsReorder: (sourceKey: string, targetKey: string) => void;
}
