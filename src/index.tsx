import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import App from './App';

import './index.css';

ReactDOM.render(
  <App history={createBrowserHistory()} />,
  document.getElementById('root'),
);
