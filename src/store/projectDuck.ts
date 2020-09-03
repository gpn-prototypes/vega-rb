import * as E from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/lib/PathReporter';
import paramsResponse from 'mocks/params.json';
import { Param, ParamArray } from 'model/Param';
import { ProjectID } from 'model/Project';
import { ofAction } from 'operators/ofAction';
import { Epic } from 'redux-observable';
import { from, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ProjectState, RootState } from './types';

const factory = actionCreatorFactory('project');

const actions = {
  fetchParams: factory.async<ProjectID, Param[]>('GET_PROJECT_PARAMS'),
};

const initialState: ProjectState = {
  params: [] as Param[],
};

const reducer = reducerWithInitialState<ProjectState>(initialState).case(
  actions.fetchParams.done,
  (state, payload) => ({ ...state, params: payload.result }),
);

const fetchParamsEpic: Epic<AnyAction, AnyAction, RootState> = (action$) =>
  action$.pipe(
    ofAction(actions.fetchParams.started),
    mergeMap((action) =>
      from(new Promise((resolve) => resolve(paramsResponse))).pipe(
        mergeMap((response) => {
          const decodeResult = ParamArray.decode(response);
          const params = E.getOrElse(() => [] as Param[])(ParamArray.decode(response));

          if (E.isRight(decodeResult)) {
            return of(
              actions.fetchParams.done({
                params: action.payload,
                result: params,
              }),
            );
          }
          return throwError(PathReporter.report(decodeResult));
        }),
        catchError((e) =>
          of(
            actions.fetchParams.failed({
              params: action.payload,
              error: e,
            }),
          ),
        ),
      ),
    ),
  );

export default {
  reducer,
  actions,
  epics: [fetchParamsEpic],
};
