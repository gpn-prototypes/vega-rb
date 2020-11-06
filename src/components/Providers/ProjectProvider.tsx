import React from 'react';
import { useRouteMatch } from 'react-router';
import { defaultTo } from 'lodash';

const ROUTE_MATCH_PROJECT_ID = '/projects/show/:projectId';

type MatchedData = { projectId: string };

const ProjectProvider: React.FC = ({ children }) => {
  const matchedData = defaultTo<MatchedData>(
    useRouteMatch<MatchedData>(ROUTE_MATCH_PROJECT_ID)?.params,
    {
      projectId: '',
    },
  );

  return (
    <ProjectContext.Provider value={matchedData}>
      {children}
    </ProjectContext.Provider>
  );
};

const ProjectContext = React.createContext<MatchedData>({ projectId: '' });

export { ProjectProvider, ProjectContext };
