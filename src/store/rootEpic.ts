import { combineEpics } from 'redux-observable'
import alertDuck from 'store/alertDuck'
import projectDuck from './projectDuck'
import tableDuck from './tableDuck'

export default combineEpics(
    ...Object.values(alertDuck.epics),
    ...projectDuck.epics,
    ...tableDuck.epics
)
