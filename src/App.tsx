import React from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Root } from '@gpn-prototypes/vega-ui';
import classNames from 'classnames';
import ErrorBoundary from 'components/ErrorBoundary';
import { Providers } from 'components/Providers';
import { SchemePage } from 'pages/Scheme';
import { CurrentProject, Identity, ShellToolkit } from 'types';

import './App.css';

const App: React.FC<Partial<ShellToolkit>> = (props) => {
  const { graphqlClient, identity, currentProject } = props;

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Root defaultTheme="dark" className={classNames('RB-App-Wrapper')}>
          <Providers
            currentProject={currentProject as CurrentProject}
            graphqlClient={graphqlClient as ApolloClient<NormalizedCacheObject>}
            identity={identity as Identity}
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
