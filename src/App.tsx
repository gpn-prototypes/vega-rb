import React from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Root } from '@gpn-prototypes/vega-ui';
import classNames from 'classnames';
import Providers from 'components/Providers';
import { ReactComponent as IconLogo } from 'icons/logo.svg';
import SchemePage from 'pages/Scheme/Scheme';

import './App.css';

interface AppProps {
  graphqlClient?: ApolloClient<NormalizedCacheObject>;
}

const App: React.FC<AppProps> = (props) => {
  const { graphqlClient } = props;
  return (
    <Root defaultTheme="dark">
      <Providers graphqlClient={graphqlClient}>
        <div className={classNames('App')}>
          <div className="Header">
            <a href="/">
              <IconLogo />
            </a>
            <span>Вега 1.0</span>
          </div>

          <SchemePage />
        </div>
      </Providers>
    </Root>
  );
};

export default App;
