import { GridCollection } from 'components/ExcelTable/types';
import { unset } from 'lodash/fp';
import { ConceptionEntity } from 'model/ConceptionEntity';
import { ofAction } from 'operators/ofAction';
import { Epic } from 'redux-observable';
import { concat, of } from 'rxjs';
import {
  distinctUntilChanged,
  ignoreElements,
  map,
  mergeMap,
  pairwise,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import tableDuck from 'store/tableDuck';
import { ConceptionsState, RootState, SavedStates } from 'store/types';
import { Conception } from 'types';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

const emptyTable: GridCollection = {
  columns: [],
  rows: [],
  errors: {},
  version: 0,
};

const loadState = (): ConceptionsState | undefined => {
  try {
    const serializedState = localStorage.getItem('conceptions');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const setStateToLocalStorage = (state: ConceptionsState): void => {
  localStorage.setItem('conceptions', JSON.stringify(state));
};

const factory = actionCreatorFactory('conceptions');

const actions = {
  createConception: factory<Conception>('CREATE_CONCEPTION'),
  updateConception: factory<Conception>('UPDATE_CONCEPTION'),
  deleteConception: factory<Conception>('DELETE_CONCEPTION'),
  setActiveConception: factory<string>('SET_ACTIVE_CONCEPTION'),
  saveTableState: factory<SavedStates>('SAVE_TABLE_STATE'),
};

const getInitialState = (): ConceptionsState => {
  const DEFAULT_STATE = {
    list: [new ConceptionEntity('Концепция 1')],
    savedStates: {},
    probabilities: {},
    active: '',
  };

  const result = loadState() || DEFAULT_STATE;
  if (!result.active.trim().length) result.active = result.list[0].id;

  return result;
};

const reducer = reducerWithInitialState<ConceptionsState>(getInitialState())
  .case(actions.createConception, (state, payload) => ({
    ...state,
    list: [...state.list, payload],
  }))
  .case(actions.updateConception, (state, payload) => {
    return {
      ...state,
      // eslint-disable-next-line no-confusing-arrow
      list: state.list.map((item) => (item.id === payload.id ? payload : item)),
    };
  })
  .case(actions.deleteConception, (state, payload) => {
    const tableStates = {
      ...state.savedStates,
    };
    const result = unset(payload.id, tableStates);
    console.info('deleteConception', result);

    return {
      ...state,
      list: state.list.filter((item) => item.id !== payload.id),
      savedStates: tableStates,
    };
  })
  .case(actions.setActiveConception, (state, payload) => ({
    ...state,
    active: payload,
  }))
  .case(actions.saveTableState, (state, payload) => ({
    ...state,
    savedStates: { ...state.savedStates, ...payload },
  }));

const saveTableStateEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofAction(actions.createConception),
    distinctUntilChanged(),
    map((value, index) => ({
      ...actions.setActiveConception,
      payload: value.payload.id,
    })),
  );

const setActiveEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
) => {
  const statePairs$ = state$.pipe(pairwise());

  return action$.pipe(
    ofAction(actions.setActiveConception),
    distinctUntilChanged(),
    withLatestFrom(statePairs$),
    mergeMap(([action, [oldState, newState]]) =>
      concat(
        of({
          ...actions.saveTableState,
          payload: {
            [oldState.conceptions.active]: oldState.table,
          },
        }),
        of({
          ...tableDuck.actions.replaceState,
          payload: {
            ...emptyTable,
            ...newState.conceptions.savedStates[newState.conceptions.active],
          },
        }),
      ),
    ),
  );
};

const saveToLocalStorageEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofAction(
      actions.createConception,
      actions.updateConception,
      actions.deleteConception,
      actions.saveTableState,
    ),
    distinctUntilChanged(),
    tap((value) => {
      console.info('Saving to LocalStorage...', value);
      setStateToLocalStorage(state$.value.conceptions);
    }),
    ignoreElements(),
  );

export default {
  reducer,
  actions,
  epics: [saveTableStateEpic, saveToLocalStorageEpic, setActiveEpic],
};
