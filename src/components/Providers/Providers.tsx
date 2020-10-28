import React from 'react';
import { Provider } from 'react-redux';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import client from 'client';
import store from 'store/initStore';

interface ProvidersProps {
  graphqlClient?: ApolloClient<NormalizedCacheObject>;
}

export const Providers: React.FC<ProvidersProps> = (props) => {
  const { graphqlClient = client, children } = props;
  return (
    <Provider store={store}>
      <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>
    </Provider>
  );
};
