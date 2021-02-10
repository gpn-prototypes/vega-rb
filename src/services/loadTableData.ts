import { Dispatch } from 'react';
import { ProjectStructure } from 'generated/graphql';
import projectService from 'services/ProjectService';
import tableDuck from 'store/tableDuck';
import { unpackTableData } from 'utils';

const initAction = (template: ProjectStructure, version: number) =>
  tableDuck.actions.initState(unpackTableData(template, version));

export async function loadTableData(
  dispatch: Dispatch<unknown>,
): Promise<void> {
  const projectVersion = await projectService.getProjectVersion();
  const resourceBaseData = await projectService.getResourceBaseData();

  if (resourceBaseData) {
    const { structure } = resourceBaseData.conceptions[0];
    dispatch(initAction(structure, projectVersion));
  } else if (resourceBaseData === null) {
    const structureTemplate = await projectService.getTableTemplate();
    dispatch(initAction(structureTemplate, projectVersion));
  }
}
