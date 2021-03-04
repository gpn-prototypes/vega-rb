import { flow, remove, set, unset } from 'lodash/fp';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ErrorsState, NormalizedErrors, RemovableError } from './types';

const factory = actionCreatorFactory('table');

const actions = {
  updateErrors: factory<NormalizedErrors>('UPDATE_ERRORS'),
  removeErrors: factory<RemovableError>('REMOVE_ERROR'),
};

const initialState: ErrorsState = {
  ids: [],
  byId: {},
};

const reducer = reducerWithInitialState<ErrorsState>(initialState)
  .case(actions.updateErrors, (state, { id, errors }) => {
    return flow(set(['byId', id], errors), (immutableState: ErrorsState) => ({
      ...immutableState,
      ids: [...immutableState.ids, id],
    }))(state);
  })
  .case(actions.removeErrors, (state, { id, path }) => {
    return flow(
      unset(['byId', id, ...path]),
      (immutableState: ErrorsState) => ({
        ...immutableState,
        ids: remove((val) => id === val)(immutableState.ids),
      }),
    )(state);
  });

export default {
  reducer,
  actions,
  epics: [],
};
