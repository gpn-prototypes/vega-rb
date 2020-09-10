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

export interface IProjectCell {
  cells: string[];
}

export interface IProjectStructureTemplate {
  domainEntities: GeoCategory[];
  attributes: CalculationParam[];
  domainObjects?: IProjectCell[];
}

export interface IProjectStructure {
  domainEntities: GeoCategory[];
  calculationParameters: CalculationParam[];
  domainObjects?: IProjectCell[];
}
