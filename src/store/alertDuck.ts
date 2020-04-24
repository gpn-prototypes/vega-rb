import { ofAction } from 'operators/ofAction'
import { Epic } from 'redux-observable'
import { of } from 'rxjs'
import { delay, mergeMap } from 'rxjs/operators'
import { RootState } from 'store/reducers'
import actionCreatorFactory, { AnyAction } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface ErrorObject {
    code?: string
    message?: string
    source?: string
    extra?: string
}

export interface ResponseError {
    errors: ErrorObject[]
}

const factory = actionCreatorFactory('alert')

const actions = {
    showLoader: factory<string>('SHOW_LOADER'),
    hideLoader: factory('HIDE_LOADER'),
    showSuccsessMessage: factory<string>('SHOW_SUCCSESS_MESSAGE'),
    hideSuccessMessage: factory('HIDE_SUCCSESS_MESSAGE'),
    showErrorMessage: factory<string | ResponseError>('SHOW_ERROR_MESSAGE'),
}

export interface AlertState {
    text: string
    loaderText: string
    errorText: string
}

const initialState: AlertState = {
    text: '',
    loaderText: '',
    errorText: '',
}

const reducer = reducerWithInitialState<AlertState>(initialState)
    .case(actions.showSuccsessMessage, (state, payload) => ({
        ...state,
        text: payload,
    }))
    .case(actions.hideSuccessMessage, (state) => ({ ...state, text: '' }))
    .case(actions.showErrorMessage, (state) => ({
        ...state,
        errorText: 'Error!',
    }))
    .case(actions.showLoader, (state, payload) => ({
        ...state,
        loaderText: payload,
    }))
    .case(actions.hideLoader, (state) => ({ ...state, loaderText: '' }))

const showAlertEpic: Epic<AnyAction, AnyAction, RootState> = (action$) =>
    action$.pipe(
        ofAction(actions.showSuccsessMessage),
        mergeMap(() => of(actions.hideSuccessMessage()).pipe(delay(2000)))
    )
export default {
    reducer,
    actions,
    epics: { showAlertEpic },
}
