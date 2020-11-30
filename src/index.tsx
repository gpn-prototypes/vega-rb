import React from 'react';
import ReactDOM from 'react-dom';
import { createGraphqlClient, Identity } from '@gpn-prototypes/vega-sdk';
import { createBrowserHistory } from 'history';

import App from './App';

import './index.css';

const identity = new Identity({ apiUrl: '/api' });

const client = createGraphqlClient({
  uri: '/graphql',
  identity,
  onError: () => {},
});

ReactDOM.render(
  <App
    history={createBrowserHistory()}
    identity={identity}
    graphqlClient={client}
  />,
  document.getElementById('root'),
);
