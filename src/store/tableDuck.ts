import {
  GridCellProperties,
  GridCollection,
  GridRow,
  IGridColumn,
  SelectedCell,
} from 'components/ExcelTable/types';
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
  updateCell: factory<{
    selectedCell: SelectedCell;
    cellData: GridCellProperties;
  }>('UPDATE_CELL'),
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
