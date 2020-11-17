import React, { forwardRef } from 'react';
import { OptionEntity } from 'components/ExcelTable/Models/OptionEntity';

import { DropDownEditor, SimpleTextEditor } from '../Editors';
import { EditorResult, TableEntities } from '../types';

export const options = {
  resource: new OptionEntity('resource', 'Р'),
  reef: new OptionEntity('reef', 'З'),
};

const geoCategoryTypeEditor = (): EditorResult => ({
  editor: forwardRef((props, ref) =>
    React.createElement(DropDownEditor, { ...props, ref, options }),
  ),
});

const geoCategoryEditor = (): EditorResult => ({ editor: SimpleTextEditor });

const getEmptyEditor = (): EditorResult => ({ editor: undefined });

export function getEditor(
  type: TableEntities = TableEntities.NONE,
): EditorResult {
  switch (type) {
    case TableEntities.GEO_CATEGORY_TYPE:
      return geoCategoryTypeEditor();

    case TableEntities.GEO_CATEGORY:
    case TableEntities.RISK:
      return geoCategoryEditor();

    default:
      return getEmptyEditor();
  }
}
