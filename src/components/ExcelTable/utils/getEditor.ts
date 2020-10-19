import { ComponentType } from 'react';
import { EditorProps } from 'react-data-grid';

import { SimpleTextEditor } from '../Editors';
import { GridCellProperties, TableEntities } from '../types';

type EditorResult =
  | { editor: ComponentType<EditorProps<GridCellProperties | undefined>> }
  | { editor: undefined };

function getEditor(type: TableEntities = TableEntities.NONE): EditorResult {
  return { editor: SimpleTextEditor };
}

export default getEditor;
