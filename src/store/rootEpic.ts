import {combineEpics} from 'redux-observable'
import alertDuck from 'store/alertDuck'
import projectDuck from './projectDuck'

export default combineEpics(
	...Object.values(alertDuck.epics),
    ...projectDuck.epics
)

