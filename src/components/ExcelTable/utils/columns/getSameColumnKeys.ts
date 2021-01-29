import { GridColumn } from 'components/ExcelTable/types';

export function getSameColumnKeys(
  { key, name: requiredName, type: requiredType }: GridColumn,
  columnList: GridColumn[],
): string[] {
  const listOfKeys = columnList
    .map((column, index) => {
      if (column.name === requiredName && column.type === requiredType)
        return column.key;

      return '';
    })
    .filter(Boolean);

  if (listOfKeys.length === 0) return [key];
  if (listOfKeys.length > 2) {
    return [];
  }

  return listOfKeys;
}
