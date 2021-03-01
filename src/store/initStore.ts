import { applyMiddleware, CombinedState, createStore, Store } from 'redux';
import * as logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import projectService from 'services/ProjectService';
import { AnyAction } from 'typescript-fsa';

import rootReducer from './reducers';
import rootEpic from './rootEpic';
import { RootState } from './types';

const configureStore = (): Store<CombinedState<RootState>, AnyAction> => {
  const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>({
    dependencies: { projectService },
  });

  const middleware =
    process.env.NODE_ENV === 'development'
      ? [epicMiddleware, logger.createLogger()]
      : [epicMiddleware];

  const store = createStore(rootReducer, applyMiddleware(...middleware));

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore();
