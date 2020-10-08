import { SimpleTextEditor } from '../Editors';
import { TableEntities } from '../types';

export function getEditor(
  type?: TableEntities,
): { editor: typeof SimpleTextEditor } | { editor: undefined } {
  if (type === TableEntities.GEO_CATEGORY) {
    return { editor: SimpleTextEditor };
  }
  return { editor: undefined };
}
