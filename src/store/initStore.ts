import {createStore, applyMiddleware} from 'redux'
import * as logger from 'redux-logger'
import { AnyAction } from 'typescript-fsa'
import {createEpicMiddleware} from 'redux-observable'
import rootReducer, {RootState} from './reducers'
import rootEpic from './rootEpic'
// import {ajaxWithJWTAuth} from 'utils/ajaxWithJWTAuth'

const configureStore = () => {
	const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>({
		// dependencies: { ajaxWithJWTAuth }
	})

	const middleware = process.env.NODE_ENV === 'production'
	? [epicMiddleware] : [epicMiddleware, logger.createLogger()]

	const store = createStore(
        rootReducer,
        applyMiddleware(...middleware)
	)

	epicMiddleware.run(rootEpic)

	return store

}

export default configureStore()


