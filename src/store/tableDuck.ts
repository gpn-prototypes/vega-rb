import {
  GridCell,
  GridCollection,
  GridColumn,
  GridRow,
} from 'components/ExcelTable/types';
import { unset } from 'lodash/fp';
import { ofAction } from 'operators/ofAction';
import { Epic } from 'redux-observable';
import { forkJoin, from, of } from 'rxjs';
import {
  distinctUntilChanged,
  ignoreElements,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import projectService from 'services/ProjectService';
import { ColumnErrors } from 'types';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { RootState, TableState, TypedColumnsList } from './types';

const factory = actionCreatorFactory('table');

const actions = {
  initState: factory<GridCollection>('INIT_STATE'),
  updateColumns: factory<GridColumn[]>('UPDATE_COLUMNS'),
  updateColumnsByType: factory<TypedColumnsList>('UPDATE_COLUMNS_BY_TYPE'),
  updateRows: factory<GridRow[]>('UPDATE_ROWS'),
  updateCell: factory<GridCell>('UPDATE_CELL'),
  updateErrors: factory<ColumnErrors>('UPDATE_ERRORS'),
  resetState: factory('RESET_STATE'),
  setRowsFilter: factory<number[]>('SET_ROWS_FILTER'),
  setColumnsFilter: factory<string[]>('SET_COLUMNS_FILTER'),
};

const initialState: TableState = {
  columns: [],
  rows: [],
  errors: {},
  version: 0,
  filter: {
    rows: [],
    columns: [],
  },
};

const reducer = reducerWithInitialState<TableState>(initialState)
  .case(actions.resetState, () => initialState)
  .case(actions.initState, (state, payload) => ({
    ...state,
    rows: payload.rows,
    columns: payload.columns,
    version: payload.version,
  }))
  .case(actions.setColumnsFilter, (state, payload) => ({
    ...state,
    filter: {
      ...state.filter,
      columns: payload,
    },
  }))
  .case(actions.setRowsFilter, (state, payload) => ({
    ...state,
    filter: {
      ...state.filter,
      rows: payload,
    },
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
  });

const saveToStorageEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofAction(
      actions.updateColumns,
      actions.updateRows,
      actions.updateCell,
      actions.updateColumnsByType,
    ),
    distinctUntilChanged(),
    mergeMap((_) => of(projectService)),
    switchMap((service) =>
      forkJoin([
        of(service),
        from(service.getTableTemplate()),
        from(service.getProjectVersion()),
      ]),
    ),
    switchMap(([service, structure, version]) =>
      from(service.saveProject(state$.value.table, structure, version)),
    ),
    ignoreElements(),
  );

export default {
  reducer,
  actions,
  epics: [saveToStorageEpic],
};
