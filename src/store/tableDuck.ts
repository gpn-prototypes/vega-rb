import { GridCell, GridColumn, GridRow } from 'components/ExcelTable/types';
import { TableError } from 'generated/graphql';
import { ofAction } from 'operators/ofAction';
import { Epic } from 'redux-observable';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { RootState, TableState } from './types';

const factory = actionCreatorFactory('table');

const actions = {
  updateColumns: factory<GridColumn[]>('UPDATE_COLUMNS'),
  updateRows: factory<GridRow[]>('UPDATE_ROWS'),
  updateCell: factory<GridCell>('UPDATE_CELL'),
  updateErrors: factory<TableError[]>('UPDATE_ERRORS'),
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

const setStateToLocalStorage = (state: TableState): void => {
  localStorage.setItem('table', JSON.stringify(state));
};

const initialState: TableState = loadState() || {
  columns: [],
  rows: [],
  errors: [],
};

const reducer = reducerWithInitialState<TableState>(initialState)
  .case(actions.updateColumns, (state, payload) => ({
    ...state,
    columns: payload,
  }))
  .case(actions.updateRows, (state, payload) => ({
    ...state,
    rows: payload,
  }))
  .case(actions.updateErrors, (state, payload) => ({
    ...state,
    errors: payload,
  }))
  .case(actions.updateCell, (state, { selectedCell, cellData }) => {
    const rows = [...state.rows];

    if (selectedCell && Number.isInteger(selectedCell.rowIdx)) {
      rows.splice(selectedCell.rowIdx, 1, {
        ...rows[selectedCell.rowIdx],
        [selectedCell.column.key]: {
          ...rows[selectedCell.rowIdx][selectedCell.column.key],
          ...cellData,
        },
      } as GridRow);
    }
    return {
      ...state,
      rows,
    };
  });

const saveToLocalStorageEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofAction(actions.updateColumns, actions.updateRows, actions.updateCell),
    distinctUntilChanged(),
    tap(() => {
      setStateToLocalStorage(state$.value.table);
    }),
  );

export default {
  reducer,
  actions,
  epics: [saveToLocalStorageEpic],
};
