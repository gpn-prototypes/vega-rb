import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { GraphQLClient, Identity } from '@gpn-prototypes/vega-sdk';
import { History } from 'history';
import store from 'store/initStore';

import { ProjectProvider } from './ProjectProvider';

interface ProvidersProps {
  graphqlClient: GraphQLClient;
  identity: Identity;
  history: History;
}

export const Providers: React.FC<ProvidersProps> = (props) => {
  const { graphqlClient, identity, children, history } = props;
  return (
    <Provider store={store}>
      <ApolloProvider client={graphqlClient}>
        <Router history={history}>
          <ProjectProvider graphqlClient={graphqlClient} identity={identity}>
            {children}
          </ProjectProvider>
        </Router>
      </ApolloProvider>
    </Provider>
  );
};
