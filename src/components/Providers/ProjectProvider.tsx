import React, { useEffect } from 'react';
import projectService from 'services/ProjectService';
import { Identity, ShellToolkit } from 'types';

interface ProjectContextProps {
  projectId: string;
  identity?: Identity;
}

const ProjectContext = React.createContext<ProjectContextProps>({
  projectId: '',
});

const ProjectProvider: React.FC<ShellToolkit> = ({
  children,
  graphqlClient,
  currentProject,
  identity,
}) => {
  const projectId = currentProject.get()?.vid || '';

  useEffect(() => {
    projectService.init({
      client: graphqlClient,
      projectId,
      identity,
    });
  }, [identity, graphqlClient, projectId]);

  return (
    <ProjectContext.Provider
      value={{
        projectId,
        identity,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider, ProjectContext };
