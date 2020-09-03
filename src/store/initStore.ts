import { applyMiddleware, CombinedState, createStore, Store } from 'redux';
import * as logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { AnyAction } from 'typescript-fsa';

import rootReducer from './reducers';
import rootEpic from './rootEpic';
import { RootState } from './types';
// import {ajaxWithJWTAuth} from 'utils/ajaxWithJWTAuth'

const configureStore = (): Store<CombinedState<RootState>, AnyAction> => {
  const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>({
    // dependencies: { ajaxWithJWTAuth }
  });

  const middleware =
    process.env.NODE_ENV === 'production'
      ? [epicMiddleware]
      : [epicMiddleware, logger.createLogger()];

  const store = createStore(rootReducer, applyMiddleware(...middleware));

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore();
