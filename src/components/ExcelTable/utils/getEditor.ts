import React, { ComponentType, forwardRef } from 'react';
import { EditorProps } from 'react-data-grid';
import { SimpleTextEditor, DropDownEditor } from '../Editors';
import { GridCellProperties, TableEntities } from '../types';

const options = [
  { id: '0', text: 'Р', value: 'resource' },
  { id: '1', text: 'З', value: 'reef' },
];

type EditorResult =
  | { editor: ComponentType<EditorProps<GridCellProperties | undefined>> }
  | { editor: undefined };

const geoCategoryTypeEditor = (): EditorResult => ({
  editor: forwardRef((props, ref) =>
    React.createElement(DropDownEditor, { ...props, ref, options }),
  ),
});

const geoCcategoryEditor = (): EditorResult => ({ editor: SimpleTextEditor })

export default function getEditor(type?: TableEntities = TableEntities.NONE): EditorResult {
  if (type === TableEntities.GEO_CATEGORY_TYPE) return geoCategoryTypeEditor();
  else if (type === TableEntities.GEO_CATEGORY) return geoCategoryEditor();
  return { editor: undefined };
}
