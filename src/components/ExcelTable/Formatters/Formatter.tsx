import React from 'react';
import { FormatterProps } from 'react-data-grid';
import { GridRow } from 'components/ExcelTable/types';

const Formatter: React.FC<FormatterProps<GridRow>> = ({ row, column }) => {
  return <>{row[column.key]?.value ?? ''}</>;
};

export default Formatter;
