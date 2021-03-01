import { combineReducers } from 'redux';
import alertDuck from 'store/alertDuck';
import errorsDuck from 'store/errorsDuck';
import projectDuck from 'store/projectDuck';
import tableDuck from 'store/tableDuck';
import treeDuck from 'store/treeDuck';

import competitiveAccessDuck from './competitiveAccessDuck';
import { RootState } from './types';

export default combineReducers<RootState>({
  alert: alertDuck.reducer,
  competitiveAccess: competitiveAccessDuck.reducer,
  errors: errorsDuck.reducer,
  project: projectDuck.reducer,
  table: tableDuck.reducer,
  tree: treeDuck.reducer,
});
