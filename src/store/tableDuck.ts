import { GridCell, GridCollection, GridRow, IGridColumn } from 'components/ExcelTable/types';
import { ofAction } from 'operators/ofAction';
import { Epic } from 'redux-observable';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { RootState, TableState } from './types';

const factory = actionCreatorFactory('table');

const actions = {
  updateColumns: factory<IGridColumn[]>('UPDATE_COLUMNS'),
  updateRows: factory<GridRow[]>('UPDATE_ROWS'),
  updateCell: factory<GridCell>('UPDATE_CELL'),
};

const loadState = (): TableState | undefined => {
  try {
    const serializedState = localStorage.getItem('table');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const setLocalStorage = (state: GridCollection): void => {
  localStorage.setItem('table', JSON.stringify(state));
};

const initialState: TableState = loadState() || {
  columns: [],
  rows: [],
};

const reducer = reducerWithInitialState<GridCollection>(initialState)
  .case(actions.updateColumns, (state, payload) => ({
    ...state,
    columns: payload,
  }))
  .case(actions.updateRows, (state, payload) => ({
    ...state,
    rows: payload,
  }));

const saveToLocalStorageEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofAction(actions.updateColumns, actions.updateRows),
    distinctUntilChanged(),
    tap(() => {
      setLocalStorage(state$.value.table);
    }),
  );

export default {
  reducer,
  actions,
  epics: [saveToLocalStorageEpic],
};
