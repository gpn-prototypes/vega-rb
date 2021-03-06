import React, { ComponentType, ReactText } from 'react';
import {
  CalculatedColumn,
  CellRendererProps,
  Column,
  EditorProps as CommonEditorProps,
  FormatterProps,
  HeaderRendererProps as BaseHeaderRendererProps,
} from 'react-data-grid';
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

export interface GridCell {
  selectedCell: SelectedCell;
  cellData: GridCellProperties;
}

export interface GridCellProperties {
  value: ReactText | DropDownOption;
  args?: GridCellArguments;
}

export interface GridRow {
  [columnKey: string]: GridCellProperties | undefined;
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

export interface ContextBody {
  idx: number;
}

export interface ColumnContextBody extends ContextBody {
  type: TableEntities;
}

export interface RowContextBody extends ContextBody {
  element: GridRow;
}

export type ContextHandler<T extends ContextBody> = (
  e: React.MouseEvent<HTMLDivElement>,
  { idx }: T,
) => void;

export type BaseProps = {
  formatter: ComponentType<FormatterProps<GridRow>>;
  headerRenderer: ComponentType<BaseHeaderRendererProps<GridRow>>;
};

export type UniColumn = CalculatedColumn<GridRow> & GridColumn;

export type CommonTableColumn = GridColumn & CalculatedColumn<GridRow>;

export interface DropdownOption {
  id: string;
  value: string;
  text: string;
}
export interface DropDownEditorProps
  extends CommonEditorProps<GridRow | undefined> {
  options: { [index: string]: DropdownOption };
}
type EditorProps = CommonEditorProps<GridRow | undefined> | DropDownEditorProps;

export type EditorResult = {
  editor?: ComponentType<EditorProps>;
};

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

export interface onRowClickArgs {
  rowIdx: number;
  row: GridRow;
  column: CommonTableColumn;
}

export type onRowClick = (args: onRowClickArgs) => void;
