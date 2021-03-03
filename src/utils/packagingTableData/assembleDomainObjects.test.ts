import { ReactText } from 'react';
import {
  GridColumn,
  GridColumnEntity,
  GridRow,
  TableEntities,
} from 'components/ExcelTable';

import { collectDomainObjects, collectRisks } from './assembleDomainObjects';

const COLUMN_ID = 'COLUMN_MOCK_KEY';

const mockRow = jest.fn<GridRow, ReactText[]>((value) => ({
  [COLUMN_ID]: {
    value,
  },
}));
const mockColumn = jest.fn<GridColumn, TableEntities[]>(
  (type) => new GridColumnEntity(COLUMN_ID, 'Mocked column', type),
);

describe('Компоновка данных перед отправкой', () => {
  describe('Геологические объекты', () => {
    let columns: GridColumn[];

    beforeAll(() => {
      columns = [mockColumn(TableEntities.GEO_CATEGORY)];
    });

    test('Должен быть строковый тип', () => {
      const row = mockRow(100);

      const expected = {
        code: 'COLUMN_MOCK_KEY',
        value: '100',
      };

      expect(collectDomainObjects(row, columns)[0]).toMatchObject(expected);
    });

    test('Пустое значение должно быть null', () => {
      const row = mockRow('');

      expect(collectDomainObjects(row, columns)[0].value).toBeNull();
    });
  });

  describe('Риски', () => {
    let columns: GridColumn[];

    beforeAll(() => {
      columns = [mockColumn(TableEntities.RISK)];
    });

    test('Проверка ожидаемого объекта', () => {
      const row = mockRow('123');
      const expected = {
        code: 'COLUMN_MOCK_KEY',
        value: 123,
      };

      expect(collectRisks(row, columns)[0]).toMatchObject(expected);
    });

    test('Нулевое значение не должно принудительно изменяться', () => {
      const row = mockRow('0');

      expect(collectRisks(row, columns)[0].value).toBe(0);
    });

    test('Пустое значение должно быть null', () => {
      const row = mockRow('');

      expect(collectRisks(row, columns)[0].value).toBeNull();
    });

    test('Риск имеет числовой формат значения', () => {
      const row = mockRow('100');

      expect(collectRisks(row, columns)[0].value).toBe(100);
    });
  });
});
