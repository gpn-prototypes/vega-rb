import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { History } from 'history';
import store from 'store/initStore';
import { Identity } from 'types';

import { ProjectProvider } from './ProjectProvider';

interface ProvidersProps {
  graphqlClient: ApolloClient<NormalizedCacheObject>;
  identity: Identity;
  history: History;
}

export const Providers: React.FC<ProvidersProps> = (props) => {
<<<<<<< HEAD
  const { graphqlClient, identity, children } = props;

=======
  const { graphqlClient, identity, children, history } = props;
>>>>>>> fix(router): добавление роутера
  return (
    <Provider store={store}>
      <ApolloProvider
        client={graphqlClient as ApolloClient<NormalizedCacheObject>}
      >
        <Router history={history}>
          <ProjectProvider graphqlClient={graphqlClient} identity={identity}>
            {children}
          </ProjectProvider>
        </Router>
      </ApolloProvider>
    </Provider>
  );
};
