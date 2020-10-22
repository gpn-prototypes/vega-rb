import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import client from 'client';
import store from 'store/initStore';

export const Providers: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Provider store={store}>
    <ApolloProvider client={client}>{children}</ApolloProvider>
  </Provider>
);
