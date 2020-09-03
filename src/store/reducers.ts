import { combineReducers } from 'redux';
import alertDuck from 'store/alertDuck';
import projectDuck from 'store/projectDuck';
import tableDuck from 'store/tableDuck';

import { RootState } from './types';

export default combineReducers<RootState>({
  alert: alertDuck.reducer,
  project: projectDuck.reducer,
  table: tableDuck.reducer,
});
