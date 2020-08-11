import { combineReducers } from 'redux'
import alertDuck, { AlertState } from 'store/alertDuck'
import projectDuck, { ProjectState } from 'store/projectDuck'
import tableDuck, { TableState } from 'store/tableDuck'

export interface RootState {
    alert: AlertState
    project: ProjectState
    table: TableState
}

export default combineReducers<RootState>({
    alert: alertDuck.reducer,
    project: projectDuck.reducer,
    table: tableDuck.reducer,
})
