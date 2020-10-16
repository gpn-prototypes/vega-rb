import { ComponentType } from 'react';
import { EditorProps } from 'react-data-grid';

import { SimpleTextEditor } from '../Editors';
import { GridCellProperties, TableEntities } from '../types';

type EditorResult =
  | { editor: ComponentType<EditorProps<GridCellProperties | undefined>> }
  | { editor: undefined };

export default function getEditor(type?: TableEntities): EditorResult {
  if (type === TableEntities.GEO_CATEGORY) {
    return { editor: SimpleTextEditor };
  }
  return { editor: undefined };
}
