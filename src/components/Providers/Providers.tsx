import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import store from 'store/initStore';
import { Identity } from 'types';

import { ProjectProvider } from './ProjectProvider';

interface ProvidersProps {
  graphqlClient: ApolloClient<NormalizedCacheObject>;
  identity: Identity;
}

export const Providers: React.FC<ProvidersProps> = (props) => {
  const { graphqlClient, identity, children } = props;

  return (
    <Provider store={store}>
      <ApolloProvider
        client={graphqlClient as ApolloClient<NormalizedCacheObject>}
      >
        <BrowserRouter>
          <ProjectProvider graphqlClient={graphqlClient} identity={identity}>
            {children}
          </ProjectProvider>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
};
