import React, { forwardRef } from 'react';
import { TableEntities } from 'components/ExcelTable/enums';
import { OptionEntity } from 'components/ExcelTable/Models';
import { GeoObjectCategories } from 'generated/graphql';

import { DropDownEditor, SimpleTextEditor } from '../Editors';
import { EditorResult } from '../types';

export const entitiesOptions = {
  RESOURCE: new OptionEntity(GeoObjectCategories.Resources, 'Р'),
  RESERVES: new OptionEntity(GeoObjectCategories.Reserves, 'З'),
};

const geoCategoryTypeEditor = (): EditorResult => ({
  editor: forwardRef((props, ref) =>
    React.createElement(DropDownEditor, {
      ...props,
      ref,
      options: entitiesOptions,
    }),
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
