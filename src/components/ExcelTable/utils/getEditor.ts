import React, { forwardRef } from 'react';
import { OptionEntity } from 'components/ExcelTable/Models/OptionEntity';

import { DropDownEditor, SimpleTextEditor } from '../Editors';
import { EditorResult, TableEntities } from '../types';

const options = {
  resource: new OptionEntity('resource', 'Р'),
  reef: new OptionEntity('reef', 'З'),
};

const geoCategoryTypeEditor = (): EditorResult => ({
  editor: forwardRef((props, ref) =>
    React.createElement(DropDownEditor, { ...props, ref, options }),
  ),
});

const geoDefaultEditor = (): EditorResult => ({ editor: SimpleTextEditor });

export default function getEditor(
  type: TableEntities = TableEntities.NONE,
): EditorResult {
  switch (type) {
    case TableEntities.GEO_CATEGORY_TYPE:
      return geoCategoryTypeEditor();

    default:
      return geoDefaultEditor();
  }
}
