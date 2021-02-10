import { TableEntities } from 'components/ExcelTable/enums';
import { GridCollection, GridColumn } from 'components/ExcelTable/types';
import { Param } from 'model/Param';

export interface CompetitiveAccess {
  isRecentlyEdited: boolean;
}

export interface AlertState {
  text: string;
  loaderText: string;
  errorText: string;
}

export interface TreeFilter {
  rows: number[];
  columns: string[];
}

export interface TreeState {
  filter: TreeFilter;
}

export interface ProjectState {
  params: Param[];
  name: string;
}

export interface RootState {
  alert: AlertState;
  project: ProjectState;
  table: GridCollection;
  tree: TreeState;
  competitiveAccess: CompetitiveAccess;
}

export type TypedColumnsList = {
  columns: GridColumn[];
  type: TableEntities;
};
