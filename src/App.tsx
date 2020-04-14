import React from 'react'
import {Switch, Route, BrowserRouter, Redirect, RouteProps} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store/initStore'
import HomePage from 'pages/Home/HomePage'
import LoginPage from 'pages/Login/LoginPage'
import './App.css'

function PrivateRoute(props: RouteProps) {
	const hasToken = true
    const { component, ...rest } = props

	return (
		hasToken
		?  <Route {...rest} component={component} />
		: <Redirect to="/login" />
	)
}

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" component={LoginPage} />
                        <PrivateRoute path="/home" component={HomePage} />
                        <Redirect to="/home" />
                    </Switch>
                </BrowserRouter>
            </div>
        </Provider>
    )
}

export default App
