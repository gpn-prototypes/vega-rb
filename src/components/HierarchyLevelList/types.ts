import { ReactElement } from 'react';
import { GridColumn } from 'components/ExcelTable';

export type Icons = {
  [iconId: string]: ReactElement;
};

export interface HierarchyLevelListProps {
  items: GridColumn[];
  isOpen?: boolean;
  handleClose: () => void;
  onSubmit: (items: GridColumn[]) => void;
  icons?: Icons;
}
