import React, { useEffect } from 'react';
import projectService from 'services/ProjectService';
import { Identity, Project, ShellToolkit } from 'types';

interface ProjectContextProps {
  project: Project;
  identity?: Identity;
}

const ProjectContext = React.createContext<ProjectContextProps>({
  project: {
    vid: '',
    version: 0,
  },
});

const ProjectProvider: React.FC<ShellToolkit> = ({
  children,
  graphqlClient,
  currentProject,
  identity,
}) => {
  const { vid: projectId, version } = currentProject.get() || {
    vid: '',
    version: 0,
  };

  useEffect(() => {
    projectService.init({
      client: graphqlClient,
      project: {
        vid: projectId,
        version,
      },
      identity,
    });
  }, [identity, graphqlClient, projectId, version]);

  return (
    <ProjectContext.Provider
      value={{
        project: currentProject.get(),
        identity,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider, ProjectContext };
