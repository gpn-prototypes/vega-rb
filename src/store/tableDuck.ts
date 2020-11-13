import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GridCell, GridColumn, GridRow } from 'components/ExcelTable/types';
import { TableError } from 'generated/graphql';
import { ofAction } from 'operators/ofAction';
import {
  GET_TABLE_TEMPLATE,
  GET_VERSION,
  SAVE_PROJECT,
} from 'pages/Scheme/components/Table/queries';
import { getGraphqlUri, getMockConceptions } from 'pages/Scheme/helpers';
import { Epic } from 'redux-observable';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import projectsApi from 'services/projects';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { packTableData } from 'utils';

import { RootState, TableState } from './types';

const factory = actionCreatorFactory('table');

const actions = {
  init: factory<{
    columns: GridColumn[];
    rows: GridRow[];
    version: number;
  }>('INIT'),
  updateColumns: factory<GridColumn[]>('UPDATE_COLUMNS'),
  updateRows: factory<GridRow[]>('UPDATE_ROWS'),
  updateCell: factory<GridCell>('UPDATE_CELL'),
  updateErrors: factory<TableError[]>('UPDATE_ERRORS'),
};

const initialState: TableState = {
  columns: [],
  rows: [],
  errors: [],
  version: 0,
};

const reducer = reducerWithInitialState<TableState>(initialState)
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

const saveToStorageEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofAction(actions.updateColumns, actions.updateRows, actions.updateCell),
    distinctUntilChanged(),
    tap(async () => {
      const client = projectsApi.getClient() as ApolloClient<
        NormalizedCacheObject
      >;
      const projectId = projectsApi.getProjectId();
      const result = await client.query({
        query: GET_TABLE_TEMPLATE,
        context: {
          uri: getGraphqlUri(projectId),
        },
      });
      const versionResult = await client.query({
        query: GET_VERSION,
        variables: {
          vid: projectId,
        },
        fetchPolicy: 'network-only',
      });

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
            structure: packTableData(
              state$.value.table,
              result?.data.resourceBase.project.template.conceptions[0]
                .structure,
            ),
          }),
          version: versionResult.data.project.version,
        },
      });
    }),
  );

export default {
  reducer,
  actions,
  epics: [saveToStorageEpic],
};
