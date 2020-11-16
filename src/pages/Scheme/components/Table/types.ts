import { ProjectStructureInput } from 'generated/graphql';

export interface TemplateProjectData {
  resourceBase: {
    project: {
      template: {
        version: string;
        conceptions: {
          name?: string;
          probability: string | null;
          structure: ProjectStructureInput;
        }[];
      };
    };
  };
}
