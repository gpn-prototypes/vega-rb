import { block } from 'bem-cn';

export const cnExcelTable = block('ExcelTable');

export const cnHeader = cnExcelTable('Header');
export const cnCell = cnExcelTable('Cell');

export const cnCellId = cnExcelTable('Cell', 'Id');
export const cnCellSplitter = cnExcelTable('Cell', 'Splitter');

export const cnCellRenaming = cnCell.state({ renaming: true });
