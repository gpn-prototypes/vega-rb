import { GridColumn, TableEntities } from '../types';

export default class GridColumnEntity implements GridColumn {
  readonly key: string;

  name: string;

  type: TableEntities;

  visible: {
    calculation: boolean;
    table: boolean;
    tree: boolean;
  };

  constructor(
    key: string,
    name = '',
    type: TableEntities = TableEntities.NONE,
    visible: {
      calculation: boolean;
      table: boolean;
      tree: boolean;
    } = {
      calculation: true,
      table: true,
      tree: true,
    },
  ) {
    this.key = key;
    this.name = name;
    this.type = type;
    this.visible = visible;
  }
}
