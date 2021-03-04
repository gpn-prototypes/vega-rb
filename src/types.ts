import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GridColumn, GridRow } from 'components/ExcelTable/types';
import { DomainObject, RbDomainEntityIcons } from 'generated/graphql';

type ProjectVID = string;

interface Project {
  vid: ProjectVID;
}

export interface CurrentProject {
  get(): Project;
}

export interface Identity {
  getToken(): Promise<string>;
}

export interface ShellToolkit {
  graphqlClient: ApolloClient<NormalizedCacheObject>;
  identity: Identity;
  currentProject: CurrentProject;
}

interface Structure {
  __typename?: string;
}

export interface GeoCategory extends Structure {
  name: string;
  icon: RbDomainEntityIcons;
  code: string;
  visible?: {
    table: boolean;
    calc: boolean;
    tree: boolean;
  };
}

export interface CalculationParam extends Structure {
  code: string;
  name: string;
  shortName: string;
  units: string;
}

export interface Risk extends Structure {
  code: string;
  name: string;
}

export interface ProjectStructure {
  domainEntities: GeoCategory[];
  calculationParameters: CalculationParam[];
  risks: Risk[];
  domainObjects: DomainObject[];
}

export type TableStructures = GeoCategory | CalculationParam | Risk;

export type Nullable<T> = T | null;

export type DomainObjectsProps = {
  domainEntitiesColumns: GridColumn[];
  attributeColumns: GridColumn[];
  riskColumns: GridColumn[];
  rows: GridRow[];
};

export type NoopFunction<T, R = void> = (data: T) => R;

export interface IData<T> {
  code: string;
  value: Nullable<T>;
}

export interface IValuableStructure {
  value: string;
}
