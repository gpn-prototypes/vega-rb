import { TableEntities } from 'components/ExcelTable/enums';
import {
  ColumnErrors,
  GridCollection,
  GridColumn,
} from 'components/ExcelTable/types';
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
export interface NormalizedState<T> {
  ids: string[];
  byId: {
    [id: string]: T;
  };
}

export type ErrorsState = NormalizedState<ColumnErrors>;

export interface RootState {
  alert: AlertState;
  project: ProjectState;
  table: GridCollection;
  tree: TreeState;
  competitiveAccess: CompetitiveAccess;
  errors: ErrorsState;
}

export type TypedColumnsList = {
  columns: GridColumn[];
  type: TableEntities;
};

export type NormalizedErrors = {
  errors: ColumnErrors;
  id: string;
};

export type RemovableError = {
  id: string;
  path: (string | number)[];
};
