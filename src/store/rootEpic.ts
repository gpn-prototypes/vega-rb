import { combineEpics } from 'redux-observable';
import alertDuck from 'store/alertDuck';
import conceptionsDuck from 'store/conceptionsDuck';
import projectDuck from 'store/projectDuck';
import tableDuck from 'store/tableDuck';

export default combineEpics(
  ...Object.values(alertDuck.epics),
  ...projectDuck.epics,
  ...tableDuck.epics,
  ...conceptionsDuck.epics,
);
