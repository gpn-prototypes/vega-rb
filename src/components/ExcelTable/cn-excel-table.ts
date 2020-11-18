import { block } from 'bem-cn';

export const cnExcelTable = block('ExcelTable');

export const cnHeader = cnExcelTable('Header');
export const cnCell = cnExcelTable('Cell');
export const cnCellTooltip = cnExcelTable('Cell', 'Tooltip');
export const cnCellValue = cnExcelTable('Cell', 'Value');
export const cnCellId = cnExcelTable('Cell', 'Id');
export const cnCellSplitter = cnExcelTable('Cell', 'Splitter');

export const cnCellRenaming = cnCell.state({ renaming: true });
export const cnCellValueError = cnCellValue.state({
  error: true,
});
