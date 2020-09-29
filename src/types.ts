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
export interface IProjectCell {
  domainObjectPath: string[];
}

export interface IProjectStructure {
  domainEntities: GeoCategory[];
  calculationParameters: CalculationParam[];
  domainObjects?: IProjectCell[];
  risks: Risk[];
}

export type Nullable<T> = T | null;
