import React, { useState } from 'react';
import { columnsListMock } from '__mocks__/columnsList';
import { createTableRowsMock } from '__mocks__/tableState';

import { ExcelTable } from './ExcelTable';

import './ExcelTable.css';

export default {
  title: 'ExcelTable',
  component: ExcelTable,
};

const tableState = {
  rows: createTableRowsMock(10000),
  columns: columnsListMock,
  version: 1,
};

export const Default: React.FC = () => {
  const [columns, setColumns] = useState(tableState.columns);
  const [rows, setRows] = useState(tableState.rows);

  return (
    <div style={{ height: '100vh' }}>
      <ExcelTable
        data={{
          columns,
          rows,
          version: tableState.version,
        }}
        errors={{}}
        setColumns={setColumns}
        setRows={setRows}
      />
    </div>
  );
};
