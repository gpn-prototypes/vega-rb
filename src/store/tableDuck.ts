import {
  GridCell,
  GridCollection,
  GridColumn,
  GridRow,
} from 'components/ExcelTable/types';
import { unset } from 'lodash/fp';
import { ofAction } from 'operators/ofAction';
import { Epic } from 'redux-observable';
import { forkJoin, from, of, throwError } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  ignoreElements,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import projectService from 'services/ProjectService';
import { ColumnErrors } from 'types';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { RootState, TypedColumnsList } from './types';

const factory = actionCreatorFactory('table');

const actions = {
  initState: factory<GridCollection>('INIT_STATE'),
  updateColumns: factory<GridColumn[]>('UPDATE_COLUMNS'),
  updateColumnsByType: factory<TypedColumnsList>('UPDATE_COLUMNS_BY_TYPE'),
  updateRows: factory<GridRow[]>('UPDATE_ROWS'),
  updateCell: factory<GridCell>('UPDATE_CELL'),
  updateErrors: factory<ColumnErrors>('UPDATE_ERRORS'),
  replaceState: factory<GridCollection>('REPLACE_STATE'),
  resetState: factory('RESET_STATE'),
};

const initialState: GridCollection = {
  columns: [],
  rows: [],
  errors: {},
  version: 0,
};

const reducer = reducerWithInitialState<GridCollection>(initialState)
  .case(actions.resetState, () => initialState)
  .case(actions.initState, (state, payload) => ({
    ...state,
    rows: payload.rows,
    columns: payload.columns,
    version: payload.version,
  }))
  .case(actions.updateColumns, (state, payload) => ({
    ...state,
    columns: payload,
  }))
  .case(
    actions.updateColumnsByType,
    (state, { columns: newColumns, type: columnsType }) => {
      const columnsTypes = state.columns.map(({ type }) => type);
      const lastIndex = columnsTypes.lastIndexOf(columnsType);
      const firstIndex = columnsTypes.findIndex((type) => type === columnsType);
      const columns = [...state.columns];

      if (lastIndex !== -1 && firstIndex !== -1) {
        columns.splice(
          firstIndex,
          columnsTypes.filter((type) => type === columnsType).length,
          ...newColumns,
        );
      } else if (firstIndex !== -1) {
        columns.splice(firstIndex, 1, ...newColumns);
      }

      return {
        ...state,
        columns,
      };
    },
  )
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
    let errors = { ...state.errors };

    const selectedColumnKey = selectedCell.column.key;
    const selectedRowIdx = selectedCell.rowIdx;

    if (selectedCell && Number.isInteger(selectedRowIdx)) {
      rows.splice(selectedRowIdx, 1, {
        ...rows[selectedRowIdx],
        [selectedColumnKey]: {
          ...rows[selectedRowIdx][selectedColumnKey],
          ...cellData,
        },
      } as GridRow);

      errors = unset([selectedColumnKey, selectedRowIdx], errors);
    }

    return {
      ...state,
      rows,
      errors,
    };
  })
  .case(actions.replaceState, (state, payload) => ({
    ...state,
    ...payload,
  }));

const saveToStorageEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofAction(
      actions.updateColumns,
      actions.updateRows,
      actions.updateCell,
      actions.replaceState,
      actions.updateColumnsByType,
    ),
    distinctUntilChanged(),
    mergeMap((_) => of(projectService)),
    mergeMap((service) =>
      forkJoin({
        structure: from(service.getTableTemplate()),
        version: from(service.getProjectVersion()),
      }).pipe(
        switchMap(({ structure, version }) =>
          from(
            service.saveProject(state$.value.table, structure, version),
          ).pipe(catchError((err) => throwError(err))),
        ),
        catchError((err) => {
          // TODO: добавить обработчик для информирования пользователя сообщением
          // eslint-disable-next-line no-console
          console.trace('Critical exception at send request to server', err);
          return of({});
        }),
      ),
    ),
    ignoreElements(),
  );

export default {
  reducer,
  actions,
  epics: [saveToStorageEpic],
};
