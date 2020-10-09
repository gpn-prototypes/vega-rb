import React, { ComponentType, forwardRef } from 'react';
import { ComponentType } from 'react';
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

export default function getEditor(type?: TableEntities = TableEntities.NONE): EditorResult {
  if (type === TableEntities.GEO_CATEGORY_TYPE) {
    return {
      editor: forwardRef((props, ref) =>
        React.createElement(DropDownEditor, { ...props, ref, options }),
      ),
    };
  } else if (type === TableEntities.GEO_CATEGORY) {
    return { editor: SimpleTextEditor };
  }
  return { editor: undefined };
}
