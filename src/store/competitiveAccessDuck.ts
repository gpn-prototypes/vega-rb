import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { CompetitiveAccess } from './types';

const factory = actionCreatorFactory('competitiveAccess');

const actions = {
  setRecentlyEdited: factory<boolean>('SET_RECENTLY_EDITED'),
};

const initialState: CompetitiveAccess = {
  isRecentlyEdited: false,
};

const reducer = reducerWithInitialState<CompetitiveAccess>(initialState).case(
  actions.setRecentlyEdited,
  (state, payload) => ({
    ...state,
    isRecentlyEdited: payload,
  }),
);

export default {
  reducer,
  actions,
};
