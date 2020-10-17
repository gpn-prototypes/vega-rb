import { CategoryIcon } from './components/ExcelTable/types';

interface Structure {
  __typename?: string;
}

export interface GeoCategory extends Structure {
  name: string;
  icon: CategoryIcon;
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

export interface ProjectCell {
  domainObjectPath: string[];
}

export interface ProjectStructure {
  domainEntities: GeoCategory[];
  calculationParameters: CalculationParam[];
  risks: Risk[];
  domainObjects?: ProjectCell[];
}

export type TableStructures = GeoCategory | CalculationParam | Risk;

export type Nullable<T> = T | null;
