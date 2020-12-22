import {
  GridCell,
  GridCollection,
  GridColumn,
  GridRow,
} from 'components/ExcelTable/types';
import { ofAction } from 'operators/ofAction';
import { Epic } from 'redux-observable';
import { EMPTY, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { unpackTableData } from 'utils';
import { getRowId } from 'utils/getRowId';

import errorsDuck from './errorsDuck';
import { RootState, TypedColumnsList } from './types';

const factory = actionCreatorFactory('table');

const actions = {
  initState: factory<GridCollection>('INIT_STATE'),
  updateColumns: factory<GridColumn[]>('UPDATE_COLUMNS'),
  updateColumnsByType: factory<TypedColumnsList>('UPDATE_COLUMNS_BY_TYPE'),
  updateRows: factory<GridRow[]>('UPDATE_ROWS'),
  updateCell: factory<GridCell>('UPDATE_CELL'),
  resetState: factory('RESET_STATE'),
};

const initialState: GridCollection = {
  columns: [],
  rows: [],
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
  .case(actions.updateCell, (state, { selectedCell, cellData }) => {
    const rows = [...state.rows];
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
    }

    return {
      ...state,
      rows,
    };
  });

const saveToStorageEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
  { projectService },
) =>
  action$.pipe(
    ofAction(
      actions.updateColumns,
      actions.updateRows,
      actions.updateCell,
      actions.updateColumnsByType,
    ),
    switchMap(() =>
      from(projectService.saveProject(state$.value.table)).pipe(
        catchError((err) => {
          // TODO: добавить обработчик для информирования пользователя сообщением
          // eslint-disable-next-line no-console
          console.error('Critical exception at save project to server', err);
          return of({});
        }),
        switchMap(() =>
          from(projectService.getResourceBaseData()).pipe(
            catchError((err) => {
              // TODO: добавить обработчик для информирования пользователя сообщением
              // eslint-disable-next-line no-console
              console.error(
                'Critical exception at fetch project from server',
                err,
              );

              return EMPTY;
            }),
            map((loadFromDatabase) =>
              actions.initState(
                unpackTableData(
                  loadFromDatabase.conceptions[0].structure,
                  projectService.version,
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );

export const updateCell: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
  { projectService },
) =>
  action$.pipe(
    ofAction(actions.updateCell),
    map(({ payload }) => {
      const { column, row } = payload.selectedCell;

      return errorsDuck.actions.removeErrors({
        id: projectService.projectId,
        path: [column.key, getRowId(row)],
      });
    }),
  );

export default {
  reducer,
  actions,
  epics: [saveToStorageEpic, updateCell],
};
