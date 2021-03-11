import { columnsListMock } from '__mocks__/columnsList';
import { createTableRowsMock, gridCell } from '__mocks__/tableState';
import {
  GridCell,
  GridColumn,
  GridColumnEntity,
  TableEntities,
} from 'components/ExcelTable';
import { filter, flow, set } from 'lodash/fp';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { Subject } from 'rxjs';
import errorsDuck from 'store/errorsDuck';
import tableDuck, { updateCell } from 'store/tableDuck';
import { RootState } from 'store/types';
import { v4 as uuid } from 'uuid';

const initialState = {
  columns: [],
  rows: [],
  version: 0,
};
const tableRowsMock = createTableRowsMock(5);

describe('tableDuck', () => {
  describe('Reducers', () => {
    test('Сброс данных таблицы', () => {
      const state = {
        rows: tableRowsMock,
        columns: columnsListMock,
        version: 123,
      };

      expect(
        tableDuck.reducer(state, tableDuck.actions.resetState()),
      ).toMatchObject(initialState);
    });

    test('Инициализация данных таблицы', () => {
      const expected = {
        rows: tableRowsMock,
        columns: columnsListMock,
        version: 2,
      };

      expect(
        tableDuck.reducer(initialState, tableDuck.actions.initState(expected)),
      ).toMatchObject(expected);
    });

    test('Обновления колонок', () => {
      const expected = {
        ...initialState,
        columns: columnsListMock,
      };

      expect(
        tableDuck.reducer(
          initialState,
          tableDuck.actions.updateColumns(columnsListMock),
        ),
      ).toMatchObject(expected);
    });

    test('Обновление колонок по типу', () => {
      const state = {
        ...initialState,
        columns: columnsListMock,
      };

      const column = new GridColumnEntity(
        uuid(),
        'TestColumn',
        TableEntities.CALC_PARAM,
      );

      const columns = flow(
        filter((col: GridColumn) => col.type === TableEntities.CALC_PARAM),
        set([0], column),
      )(columnsListMock) as GridColumn[];

      const expected = {
        ...initialState,
        columns: set([0], column, columnsListMock),
      };

      expect(
        tableDuck.reducer(
          state,
          tableDuck.actions.updateColumnsByType({
            columns,
            type: TableEntities.CALC_PARAM,
          }),
        ),
      ).toMatchObject(expected);
    });

    test('Обновление строк', () => {
      const expected = {
        ...initialState,
        rows: tableRowsMock,
      };

      expect(
        tableDuck.reducer(
          initialState,
          tableDuck.actions.updateRows(tableRowsMock),
        ),
      ).toMatchObject(expected);
    });

    test('Обновление ячейки', () => {
      const cell: GridCell = {
        selectedCell: {
          column: { key: 'AREA', name: 'test' },
          rowIdx: 1,
          row: {
            id: {
              value: 124,
            },
          },
        },
        cellData: {
          value: 222,
        },
      };

      const state = {
        rows: tableRowsMock,
        columns: columnsListMock,
        version: 2,
      };

      const expected = {
        ...state,
        rows: set(
          [cell.selectedCell.rowIdx, cell.selectedCell.column.key],
          cell.cellData,
          tableRowsMock,
        ),
      };

      expect(
        tableDuck.reducer(state, tableDuck.actions.updateCell(cell)),
      ).toMatchObject(expected);
    });
  });

  describe('updateCellEpic', () => {
    const store = new StateObservable<RootState>(
      new Subject(),
      {} as RootState,
    );

    test('Удаление ошибок при обновлении ячейки (Epic)', (done) => {
      const projectService = { projectId: 'project_0001' };
      const action$ = ActionsObservable.of(
        tableDuck.actions.updateCell(gridCell),
      );
      const expected = {
        type: errorsDuck.actions.removeErrors.type,
        payload: { id: 'project_0001', path: ['COLUMN_POLL_KEY', 123] },
      };

      const epic$ = updateCell(action$, store, { projectService });

      epic$.subscribe((action) => {
        expect(action).toMatchObject(expected);
        done();
      });
    });
  });
});
