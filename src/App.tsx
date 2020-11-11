import React from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Root } from '@gpn-prototypes/vega-ui';
import classNames from 'classnames';
import ErrorBoundary from 'components/ErrorBoundary';
import { Providers } from 'components/Providers';
import { SchemePage } from 'pages/Scheme';

import './App.css';

interface AppProps {
  graphqlClient?: ApolloClient<NormalizedCacheObject>;
}

const App: React.FC<AppProps> = (props) => {
  const { graphqlClient } = props;

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Root defaultTheme="dark">
          <Providers graphqlClient={graphqlClient}>
            <div className={classNames('App')}>
              <SchemePage />
            </div>
          </Providers>
        </Root>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
