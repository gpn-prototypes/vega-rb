import { ProjectStructure } from 'types';

export interface TemplateProjectData {
  resourceBase: {
    project: {
      template: {
        version: string;
        conceptions: {
          name?: string;
          probability: string | null;
          structure: ProjectStructure;
        }[];
      };
    };
  };
}
