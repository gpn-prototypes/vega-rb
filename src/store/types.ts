import { GridCollection } from 'components/ExcelTable/types';
import { TableError } from 'generated/graphql';
import { Param } from 'model/Param';

export interface TableState extends GridCollection {
  errors: TableError[];
  version: number;
}
export interface AlertState {
  text: string;
  loaderText: string;
  errorText: string;
}

export interface ProjectState {
  params: Param[];
}

export interface RootState {
  alert: AlertState;
  project: ProjectState;
  table: TableState;
}
