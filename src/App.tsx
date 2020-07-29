import React from 'react'
import { cnTheme } from '@gpn-design/uikit/Theme'
import {
    BrowserRouter,
    Redirect,
    Route,
    RouteProps,
    Switch,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store/initStore'
import HomePage from 'pages/Home/HomePage'
import LoginPage from 'pages/Login/LoginPage'
import ProjectsPage from 'pages/Projects/Projects'
import CreateProject from 'pages/Projects/CreateProject'
import SchemePage from 'pages/Scheme/Scheme'
import classNames from 'classnames'
import { ReactComponent as IconLogo } from 'icons/logo.svg'
import { ApolloProvider } from '@apollo/client'
import client from 'client'

import '@gpn-design/uikit/__internal__/src/components/Theme/Theme.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDark.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDisplay.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_space/Theme_space_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_size/Theme_size_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_control/Theme_control_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/utils/whitepaper/whitepaper.css'
import './App.css'

const themeClassname = cnTheme({
    color: 'gpnDark',
    space: 'gpnDefault',
    size: 'gpnDefault',
    font: 'gpnDark',
    control: 'gpnDefault',
})

function PrivateRoute(props: RouteProps) {
    const hasToken = true
    const { component, ...rest } = props

    return hasToken ? (
        <Route {...rest} component={component} />
    ) : (
        <Redirect to="/login" />
    )
}

function App() {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <div className={classNames('App', themeClassname)}>
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
                            <Route exact path="/p/:id" component={SchemePage} />
                            <Route
                                path="/projects/create"
                                component={CreateProject}
                            />
                            <Route path="/projects" component={ProjectsPage} />
                            <Redirect to="/projects" />
                        </Switch>
                    </BrowserRouter>
                </div>
            </ApolloProvider>
        </Provider>
    )
}

export default App
