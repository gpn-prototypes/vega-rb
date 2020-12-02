import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { defaultTo } from 'lodash';
import projectService from 'services/ProjectService';
import { Identity } from 'types';

const ROUTE_MATCH_PROJECT_ID = '/projects/show/:projectId';

type MatchedData = { projectId: string };

interface ProjectContextProps extends MatchedData {
  identity?: Identity;
}

interface ProjectProviderProps {
  graphqlClient: ApolloClient<NormalizedCacheObject>;
  identity: Identity;
}

const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
  graphqlClient,
  identity,
}) => {
  const matchedData = defaultTo<MatchedData>(
    useRouteMatch<MatchedData>(ROUTE_MATCH_PROJECT_ID)?.params,
    {
      projectId: '',
    },
  );

  useEffect(() => {
    projectService.init({
      client: graphqlClient,
      projectId: matchedData.projectId,
      identity,
    });
  }, [identity, graphqlClient, matchedData]);

  return (
    <ProjectContext.Provider
      value={{
        ...matchedData,
        identity,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

const ProjectContext = React.createContext<ProjectContextProps>({
  projectId: '',
});

export { ProjectProvider, ProjectContext };
