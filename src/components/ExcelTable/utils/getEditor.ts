import React, { forwardRef } from 'react';
import { OptionEntity } from 'components/ExcelTable/Models/OptionEntity';
import { GeoObjectCategories } from 'generated/graphql';

import { DropDownEditor, SimpleTextEditor } from '../Editors';
import { EditorResult, TableEntities } from '../types';

export const entitiesOptions = {
  RESOURCE: new OptionEntity(GeoObjectCategories.Resources, 'Р'),
  REEF: new OptionEntity(GeoObjectCategories.Reserves, 'З'),
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
