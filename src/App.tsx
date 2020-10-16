import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { cnTheme, useTheme } from '@gpn-design/uikit/Theme';
import classNames from 'classnames';
import Providers from 'components/Providers';
import { ReactComponent as IconLogo } from 'icons/logo.svg';
import HomePage from 'pages/Home/HomePage';
import LoginPage from 'pages/Login/LoginPage';
import SchemePage from 'pages/Scheme/Scheme';

import '@gpn-design/uikit/__internal__/src/components/Theme/Theme.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDark.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDisplay.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_space/Theme_space_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_size/Theme_size_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_control/Theme_control_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/utils/whitepaper/whitepaper.css';
import './App.css';

function PrivateRoute(props: RouteProps): JSX.Element {
  const hasToken = true;
  const { component, ...rest } = props;

  return hasToken ? (
    <Route {...rest} component={component} />
  ) : (
    <Redirect to="/login" />
  );
}

const App: React.FC = () => {
  const { theme } = useTheme();
  const themeClassName = { ...theme, color: theme.color.invert };

  return (
    <Providers>
      <div className={classNames('App', cnTheme(themeClassName))}>
        <div className="Header">
          <a href="/">
            <IconLogo />
          </a>
          <span>Вега 1.0</span>
        </div>

        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/home" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/" component={SchemePage} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    </Providers>
  );
};

export default App;
