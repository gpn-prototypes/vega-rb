import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { TreeFilter, TreeState } from './types';

const factory = actionCreatorFactory('treeFilter');

const actions = {
  resetState: factory('RESET_STATE'),
  setFilter: factory<TreeFilter>('SET_FILTER'),
};

const initialState: TreeState = {
  filter: {
    rows: [],
    columns: [],
  },
};

const reducer = reducerWithInitialState<TreeState>(initialState)
  .case(actions.resetState, () => initialState)
  .case(actions.setFilter, (state, payload) => ({
    ...state,
    filter: payload,
  }));

export default {
  reducer,
  actions,
};
