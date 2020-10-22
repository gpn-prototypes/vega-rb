/* eslint-disable */
// @ts-nocheck

import { ComponentType } from 'react';
import { HeaderRendererProps } from 'react-data-grid';
import { Formatter } from 'components/ExcelTable/Formatters/Formatter';
import {
  FormatterProps,
  GridRow,
  GridColumn,
  TableEntities,
} from 'components/ExcelTable/types';

import columnsFactory from './columnsFactory';
import createColumn from './createColumn';
import {
  cnCell,
  cnCellId,
  cnCellSplitter,
  cnHeader,
} from 'components/ExcelTable/cn-excel-table';

let formatter: ComponentType<FormatterProps<GridRow>>;
let HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>;

const mockColumn = jest.fn((type) => ({
  ...createColumn(type),
  isRenaming: false,
}));

beforeEach(() => {
  formatter = Formatter;
});

describe('CALC_PARAM column', () => {
  const column = columnsFactory(
    mockColumn(TableEntities.CALC_PARAM),
    formatter,
    HeaderRenderer,
  );

  test('correct type', () => {
    expect(column.type).toEqual(TableEntities.CALC_PARAM);
  });
  test('correct properties', () => {
    expect(column).toMatchObject<GridColumn>({
      editable: false,
      resizable: true,
      sortable: true,
      minWidth: 112,
    });
  });
  test('correct headerCellClass', () => {
    const expectClassName = cnHeader.toString();
    expect(column.headerCellClass).toEqual(expectClassName);
  });
  test('correct cellClass', () => {
    const expectClassName = cnCell.toString();
    expect(column.cellClass).toEqual(expectClassName);
  });
});

describe('RISK column', () => {
  const column = columnsFactory(
    mockColumn(TableEntities.RISK),
    formatter,
    HeaderRenderer,
  );

  test('Validate type', () => {
    expect(column.type).toEqual(TableEntities.RISK);
  });
  test('Validate properties', () => {
    expect(column).toMatchObject<GridColumn>({
      editable: true,
      resizable: true,
      sortable: true,
      minWidth: 112,
      notRemovable: false,
    });
  });
  test('correct headerCellClass', () => {
    const expectClassName = cnHeader.toString();
    expect(column.headerCellClass).toEqual(expectClassName);
  });
  test('correct cellClass', () => {
    const expectClassName = cnCell.toString();
    expect(column.cellClass).toEqual(expectClassName);
  });
});

describe('ID column', () => {
  const column = columnsFactory(
    mockColumn(TableEntities.ID),
    formatter,
    HeaderRenderer,
  );

  test('Validate type', () => {
    expect(column.type).toEqual(TableEntities.ID);
  });
  test('Validate properties', () => {
    expect(column).toMatchObject<GridColumn>({
      editable: false,
      resizable: false,
      sortable: false,
      frozen: true,
      minWidth: 40,
      maxWidth: 55,
    });
  });
  test('correct headerCellClass', () => {
    const expectClassName = cnCellId.mix(cnHeader).toString();
    expect(column.headerCellClass).toEqual(expectClassName);
  });
  test('correct cellClass', () => {
    const expectClassName = cnCellId.mix(cnCell).toString();
    expect(column.cellClass).toEqual(expectClassName);
  });
});

describe('SPLITTER column', () => {
  const column = columnsFactory(
    mockColumn(TableEntities.SPLITTER),
    formatter,
    HeaderRenderer,
  );

  test('Validate type', () => {
    expect(column.type).toEqual(TableEntities.SPLITTER);
  });
  test('Validate properties', () => {
    expect(column).toMatchObject<GridColumn>({
      type: TableEntities.SPLITTER,
    });
  });
  test('correct headerCellClass', () => {
    const expectClassName = cnCellSplitter.mix(cnHeader).toString();
    expect(column.headerCellClass).toEqual(expectClassName);
  });
  test('correct cellClass', () => {
    const expectClassName = cnCellSplitter.mix(cnCell).toString();
    expect(column.cellClass).toEqual(expectClassName);
  });
});

describe('GEO_CATEGORY_TYPE column', () => {
  const column = columnsFactory(
    mockColumn(TableEntities.GEO_CATEGORY_TYPE),
    formatter,
    HeaderRenderer,
  );

  test('Validate type', () => {
    expect(column.type).toEqual(TableEntities.GEO_CATEGORY_TYPE);
  });
});

describe('DEFAULT column', () => {
  const column = columnsFactory(createColumn(), formatter, HeaderRenderer);

  test('Default column', () => {
    expect(column).toMatchObject<GridColumn>({
      editable: true,
      resizable: true,
      sortable: true,
      minWidth: 112,
    });
  });
  test('correct headerCellClass', () => {
    const expectClassName = cnHeader.state({ renaming: true }).toString();
    expect(column.headerCellClass).toEqual(expectClassName);
  });
  test('correct cellClass', () => {
    const expectClassName = cnCell.toString();
    expect(column.cellClass).toEqual(expectClassName);
  });
});
