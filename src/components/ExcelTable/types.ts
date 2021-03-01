import React, { ComponentType, ReactText } from 'react';
import { CalculatedColumn, Column, EditorProps } from 'react-data-grid';
import {
  CellRendererProps,
  FormatterProps as BaseFormatterProps,
  HeaderRendererProps as BaseHeaderRendererProps,
} from 'react-data-grid/lib/common/types';
import {
  CategoryIcon,
  TableEntities,
  VisibleKeys,
} from 'components/ExcelTable/enums';
import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
  GeoObjectCategories,
  RbErrorInterface,
  TableError,
} from 'generated/graphql';

export type ErrorWrapper = { [index: string]: TableError };

export type ColumnErrors = { [index: string]: ErrorWrapper };

export type SelectedCell = {
  rowIdx: number;
  row: GridRow;
  column: GridColumn;
};

export type VisibilityProperties = {
  [key in VisibleKeys]: boolean;
};

export interface GridCellParameters {
  value: ReactText;
  type: DistributionParameterTypes;
}

export interface GridCellArguments {
  type: DistributionTypes;
  definition: DistributionDefinitionTypes;
  parameters: GridCellParameters[];
  minBound?: number;
  maxBound?: number;
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
  version: number;
}

export type ContextHandler = (
  e: React.MouseEvent<HTMLDivElement>,
  { idx }: { idx: number; type: TableEntities },
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
