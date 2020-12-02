import React, { useState } from 'react';
import faker from 'faker';
import { SpecialColumns } from 'model/Table';

import { cnCell, cnCellId, cnCellSplitter, cnHeader } from './cn-excel-table';
import ExcelTable from './index';
import { GridCollection, TableEntities } from './types';

import './ExcelTable.css';

export default {
  title: 'ExcelTable',
  component: ExcelTable,
};

const mockData: GridCollection = {
  columns: [
    {
      key: SpecialColumns.ID,
      name: '',
      cellClass: cnCellId,
      headerCellClass: cnCellId,
      type: TableEntities.ID,
    },
    {
      key: 'area',
      name: 'Лицензионный участок',
      hasIcon: true,
      type: TableEntities.GEO_CATEGORY,
    },
    {
      key: 'deposit',
      name: 'Месторождение',
      hasIcon: true,
      type: TableEntities.GEO_CATEGORY,
    },
    {
      key: 'layer',
      name: 'Пласт',
      hasIcon: true,
      type: TableEntities.GEO_CATEGORY,
    },
    {
      key: 'well',
      name: 'Скважина',
      hasIcon: true,
      type: TableEntities.GEO_CATEGORY,
    },
    {
      key: 'probability',
      name: 'Вероятность',
      hasIcon: true,
      type: TableEntities.GEO_CATEGORY,
    },
    {
      key: 'category',
      name: 'Кат.',
      type: TableEntities.GEO_CATEGORY,
    },
    {
      key: SpecialColumns.SPLITTER,
      name: '',
      maxWidth: 32,
      minWidth: 32,
      type: TableEntities.SPLITTER,
      headerCellClass: cnCellSplitter,
      cellClass: cnCellSplitter,
    },
    {
      key: 'test',
      name: 'TEST',
      headerId: 'A',
      type: TableEntities.CALC_PARAM,
    },
    {
      key: 'test2',
      name: 'TEST2',
      headerId: 'B',
      type: TableEntities.CALC_PARAM,
    },
    {
      key: 'test3',
      name: 'TEST3',
      headerId: 'C',
      type: TableEntities.CALC_PARAM,
    },
    {
      key: 'square',
      name: 'Площадь',
      cellClass: cnCell,
      editable: true,
      resizable: true,
      sortable: true,
      headerId: 'E',
      type: TableEntities.CALC_PARAM,
      headerCellClass: cnHeader,
    },
    {
      key: 'square2',
      name: 'Площадь2',
      cellClass: cnCell,
      editable: true,
      resizable: true,
      sortable: true,
      headerId: 'F',
      type: TableEntities.CALC_PARAM,
      headerCellClass: cnHeader,
    },
  ],
  rows: [...Array(10000)].map((_, i) => ({
    id: { value: i },
    area: {
      value: faker.random.arrayElement(['Надежденский', 'Угловой_Сц-4_base']),
    },
    deposit: {
      value: faker.random.arrayElement(['РА-132', 'Незалёжное', 'Д122-УЩ']),
    },
    layer: {
      value: faker.random.arrayElement(['Д 5', 'P50', 'Т1 + Т2']),
    },
    well: {
      value: faker.random.number(50).toString(),
    },
    category: {
      value: faker.random.arrayElement(['Р', 'З']),
    },
    probability: {
      value: faker.random.number(100).toString(),
    },
  })),
  errors: [],
  version: 1,
};

export const Default: React.FC = () => {
  const [columns, setColumns] = useState(mockData.columns);
  const [rows, setRows] = useState(mockData.rows);

  return (
    <div style={{ height: '100vh' }}>
      <ExcelTable
        data={{
          columns,
          rows,
        }}
        setColumns={setColumns}
        setRows={setRows}
      />
    </div>
  );
};
