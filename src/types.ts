import {
  DomainObject,
  RbDomainEntityIcons,
  TableError,
} from 'generated/graphql';

export interface Identity {
  getToken(): Promise<string>;
}

interface Structure {
  __typename?: string;
}

export interface Conception {
  id: string;
  title: string;
  description: string;
  created: number;
  probability: number | string;
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

export type NoopFunction<R = never, T = void> = (data: R) => T;

type RowError = { [index: number]: TableError[] };

export type ColumnErrors = { [index: string]: RowError };
