import { GridColumn, TableEntities, VisibilityProperties } from '../types';

export default class GridColumnEntity implements GridColumn {
  readonly key: string;

  name: string;

  type: TableEntities;

  visible: VisibilityProperties = {
    calculation: true,
    table: true,
    tree: true,
  };

  constructor(
    key: string,
    name = '',
    type: TableEntities = TableEntities.NONE,
  ) {
    this.key = key;
    this.name = name;
    this.type = type;
  }
}
