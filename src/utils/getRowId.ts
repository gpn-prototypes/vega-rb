import { GridRow } from 'components/ExcelTable/types';

export const getRowId = (row: GridRow): number => (row.id?.value as number) - 1;
