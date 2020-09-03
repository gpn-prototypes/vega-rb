import { ofAction } from 'operators/ofAction';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { AlertState, RootState } from './types';

export interface ErrorObject {
  code?: string;
  message?: string;
  source?: string;
  extra?: string;
}

export interface ResponseError {
  errors: ErrorObject[];
}

const factory = actionCreatorFactory('alert');

const actions = {
  showLoader: factory<string>('SHOW_LOADER'),
  hideLoader: factory('HIDE_LOADER'),
  showSuccessMessage: factory<string>('SHOW_SUCCESS_MESSAGE'),
  hideSuccessMessage: factory('HIDE_SUCCESS_MESSAGE'),
  showErrorMessage: factory<string | ResponseError>('SHOW_ERROR_MESSAGE'),
};

const initialState: AlertState = {
  text: '',
  loaderText: '',
  errorText: '',
};

const reducer = reducerWithInitialState<AlertState>(initialState)
  .case(actions.showSuccessMessage, (state, payload) => ({
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
  .case(actions.hideLoader, (state) => ({ ...state, loaderText: '' }));

const showAlertEpic: Epic<AnyAction, AnyAction, RootState> = (action$) =>
  action$.pipe(
    ofAction(actions.showSuccessMessage),
    mergeMap(() => of(actions.hideSuccessMessage()).pipe(delay(2000))),
  );

export default {
  reducer,
  actions,
  epics: { showAlertEpic },
};
