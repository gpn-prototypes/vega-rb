import {
  GridCollection,
  GridColumn,
  TableEntities,
} from 'components/ExcelTable/types';
import { Param } from 'model/Param';

export interface TableState extends GridCollection {
  filter: {
    rows: number[];
    columns: string[];
  };
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

export type TypedColumnsList = {
  columns: GridColumn[];
  type: TableEntities;
};
