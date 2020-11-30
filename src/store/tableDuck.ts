import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  GridCell,
  GridColumn,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';
import { TableError, TableNames } from 'generated/graphql';
import { ofAction } from 'operators/ofAction';
import {
  GET_TABLE_TEMPLATE,
  GET_VERSION,
  SAVE_PROJECT,
} from 'pages/Scheme/components/Table/queries';
import { getGraphqlUri, getMockConceptions } from 'pages/Scheme/helpers';
import { Epic } from 'redux-observable';
import { forkJoin, from, of } from 'rxjs';
import {
  distinctUntilChanged,
  ignoreElements,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import projectsApi from 'services/projects';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { packTableData } from 'utils';

import { RootState, TableState } from './types';

const factory = actionCreatorFactory('table');

type UpdateColumnsByTypePayload = {
  columns: GridColumn[];
  type: TableEntities;
};

type InitTablePayload = {
  columns: GridColumn[];
  rows: GridRow[];
  version: number;
};

const actions = {
  init: factory<InitTablePayload>('INIT_TABLE'),
  updateColumns: factory<GridColumn[]>('UPDATE_COLUMNS'),
  updateColumnsByType: factory<UpdateColumnsByTypePayload>(
    'UPDATE_COLUMNS_BY_TYPE',
  ),
  updateRows: factory<GridRow[]>('UPDATE_ROWS'),
  updateCell: factory<GridCell>('UPDATE_CELL'),
  updateErrors: factory<TableError[]>('UPDATE_ERRORS'),
  reset: factory('RESET_TABLE'),
};

const initialState: TableState = {
  columns: [],
  rows: [],
  errors: [],
  version: 0,
};

const reducer = reducerWithInitialState<TableState>(initialState)
  .case(actions.reset, () => initialState)
  .case(actions.init, (state, payload) => ({
    ...state,
    rows: payload.rows,
    columns: payload.columns,
    version: payload.version,
  }))
  .case(actions.updateColumns, (state, payload) => ({
    ...state,
    columns: payload,
  }))
  .case(actions.updateColumnsByType, (state, payload) => {
    const { columns: newColumns, type } = payload;
    const columnsTypes = state.columns.map(({ type: t }) => t);
    const lastIndex = columnsTypes.lastIndexOf(type);
    const firstIndex = columnsTypes.findIndex((t) => t === type);
    const columns = [...state.columns];
    if (lastIndex !== -1 && firstIndex !== -1) {
      columns.splice(
        firstIndex,
        columnsTypes.filter((t) => t === type).length,
        ...newColumns,
      );
    } else if (firstIndex !== -1) {
      columns.splice(firstIndex, 1, ...newColumns);
    }
    return {
      ...state,
      columns,
    };
  })
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
    const errors = [...state.errors];
    if (selectedCell && Number.isInteger(selectedCell.rowIdx)) {
      rows.splice(selectedCell.rowIdx, 1, {
        ...rows[selectedCell.rowIdx],
        [selectedCell.column.key]: {
          ...rows[selectedCell.rowIdx][selectedCell.column.key],
          ...cellData,
        },
      } as GridRow);

      const errorIdx = errors.findIndex(
        ({ row: rowIdx, column: columnIdx, tableName }) => {
          const tableColumnIdx = state.columns
            .filter((c) => c.type === (selectedCell.column as GridColumn).type)
            .findIndex(
              (c) => c.key === (selectedCell.column as GridColumn).key,
            );
          const isSameRow = rowIdx === selectedCell.rowIdx;
          const isSameTableType =
            (selectedCell.column.key === TableEntities.GEO_CATEGORY &&
              tableName === TableNames.DomainEntities) ||
            ((selectedCell.column as GridColumn).type ===
              TableEntities.CALC_PARAM &&
              tableName === TableNames.Attributes);
          const isSameColumn = tableColumnIdx === columnIdx;
          return isSameRow && isSameColumn && isSameTableType;
        },
      );
      if (errorIdx !== -1) {
        errors.splice(errorIdx, 1);
      }
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
    mergeMap((_) =>
      of({
        client: projectsApi.getClient() as ApolloClient<NormalizedCacheObject>,
        projectId: projectsApi.getProjectId(),
      }),
    ),
    switchMap(({ client, projectId }) =>
      forkJoin([
        of({ client, projectId }),
        from(
          client
            .query({
              query: GET_TABLE_TEMPLATE,
              context: {
                uri: getGraphqlUri(projectId),
              },
            })
            .then(
              ({ data }) =>
                data.resourceBase.project.template.conceptions[0].structure,
            ),
        ),
        from(
          client
            .query({
              query: GET_VERSION,
              variables: {
                vid: projectId,
              },
              fetchPolicy: 'no-cache',
            })
            .then(({ data }) => data.project.version),
        ),
      ]),
    ),
    switchMap(([{ client, projectId }, structure, version]) =>
      from(
        client.mutate({
          mutation: SAVE_PROJECT,
          context: {
            uri: getGraphqlUri(projectId),
          },
          variables: {
            projectInput: getMockConceptions({
              name: 'conception_1',
              description: '',
              probability: 0.6,
              structure: packTableData(state$.value.table, structure),
            }),
            version,
          },
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
