import {
  GridCollection,
  GridColumn,
  TableEntities,
} from 'components/ExcelTable/types';
import { Param } from 'model/Param';
import { Conception } from 'types';

export type SavedStates = { [index: string]: GridCollection };
export type ProbabilityStates = { [index: string]: 'string' };

export interface CompetitiveAccess {
  isRecentlyEdited: boolean;
}

export interface ConceptionsState {
  list: Conception[];
  savedStates: SavedStates;
  probabilities: ProbabilityStates;
  active: string;
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
  conceptions: ConceptionsState;
}

export type TypedColumnsList = {
  columns: GridColumn[];
  type: TableEntities;
};
