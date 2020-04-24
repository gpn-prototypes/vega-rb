import { combineReducers } from 'redux'
import alertDuck, { AlertState } from 'store/alertDuck'
import projectDuck, { ProjectState } from 'store/projectDuck'

export interface RootState {
    alert: AlertState
    project: ProjectState
}

export default combineReducers<RootState>({
    alert: alertDuck.reducer,
    project: projectDuck.reducer,
})
