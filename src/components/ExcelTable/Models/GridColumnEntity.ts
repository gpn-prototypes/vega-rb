import { GridColumn, TableEntities, VisibilityProperties } from '../types';

export default class GridColumnEntity implements GridColumn {
  readonly key: string;

  name: string;

  type: TableEntities;

  visible: VisibilityProperties;

  constructor(
    key: string,
    name = '',
    type: TableEntities = TableEntities.NONE,
    visible = {
      calc: true,
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
