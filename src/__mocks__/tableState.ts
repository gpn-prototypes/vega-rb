import {
  GridCell,
  GridCellProperties,
  GridColumn,
  GridRow,
} from 'components/ExcelTable';
import * as faker from 'faker';

export const gridCell: GridCell = {
  selectedCell: {
    column: { key: 'COLUMN_POLL_KEY' } as GridColumn,
    rowIdx: 123,
    row: {} as GridRow,
  },
  cellData: {} as GridCellProperties,
};

export const createTableRowsMock = (count = 10): GridRow[] =>
  [...Array(count)].map((_, i) => ({
    id: { value: i },
    AREA: {
      value: faker.random.arrayElement(['Надежденский', 'Угловой_Сц-4_base']),
    },
    DEPOSIT: {
      value: faker.random.arrayElement(['РА-132', 'Незалёжное', 'Д122-УЩ']),
    },
    LAYER: {
      value: faker.random.arrayElement(['Д 5', 'P50', 'Т1 + Т2']),
    },
    WELL: {
      value: faker.random.number(50).toString(),
    },
    CATEGORY: {
      value: faker.random.arrayElement(['Р', 'З']),
    },
    PROBABILITY: {
      value: faker.random.number(100).toString(),
    },
  }));
