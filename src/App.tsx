import React from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Identity } from '@gpn-prototypes/vega-sdk';
import { Root } from '@gpn-prototypes/vega-ui';
import classNames from 'classnames';
import ErrorBoundary from 'components/ErrorBoundary';
import { Providers } from 'components/Providers';
import { History } from 'history';
import { SchemePage } from 'pages/Scheme';

import './App.css';

interface AppProps {
  graphqlClient: ApolloClient<NormalizedCacheObject>;
  identity: Identity;
  history: History;
}

const App: React.FC<AppProps> = (props) => {
  const { graphqlClient, identity, history } = props;

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Root defaultTheme="dark" className={classNames('RB-App-Wrapper')}>
          <Providers
            graphqlClient={graphqlClient}
            identity={identity}
            history={history}
          >
            <div className={classNames('RB-App')}>
              <SchemePage />
            </div>
          </Providers>
        </Root>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
