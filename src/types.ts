import { GridColumn, GridRow } from 'components/ExcelTable/types';
import { DomainObject, RbDomainEntityIcons } from 'generated/graphql';

export interface Identity {
  getToken(): Promise<string>;
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
  rows: GridRow[];
  risks: GridColumn[];
  calculationParams: GridColumn[];
  domainEntities: GridColumn[];
};

export type NoopFunction<T, R = void> = (data: T) => R;

export interface IValuableStructure {
  value: string;
}
