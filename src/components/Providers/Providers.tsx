import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import store from 'store/initStore';
import { ShellToolkit } from 'types';

import { ProjectProvider } from './ProjectProvider';

export const Providers: React.FC<ShellToolkit> = (props) => {
  const { graphqlClient, identity, currentProject, children } = props;

  return (
    <Provider store={store}>
      <ApolloProvider client={graphqlClient}>
        <BrowserRouter>
          <ProjectProvider
            currentProject={currentProject}
            graphqlClient={graphqlClient}
            identity={identity}
          >
            {children}
          </ProjectProvider>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
};
