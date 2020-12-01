import { GridCollection } from 'components/ExcelTable/types';
import { Param } from 'model/Param';

export type TableState = GridCollection;

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
