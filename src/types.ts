import {
  DomainObject,
  RbDomainEntityIcons,
  TableError,
} from 'generated/graphql';

export interface Identity {
  getToken(): string;
}

interface Structure {
  __typename?: string;
}

export interface GeoCategory extends Structure {
  name: string;
  icon: RbDomainEntityIcons;
  code: string;
  visible: {
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
  domainObjects?: DomainObject[];
}

export type TableStructures = GeoCategory | CalculationParam | Risk;

export type Nullable<T> = T | null;

type RowError = { [index: number]: TableError[] };

export type ColumnErrors = { [index: string]: RowError };
