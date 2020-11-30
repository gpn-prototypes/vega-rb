import React, {
  // ComponentType,
  forwardRef,
  ForwardRefRenderFunction,
  // MutableRefObject,
  // ReactElement,
  // RefForwardingComponent,
} from 'react';

// import { OptionEntity } from 'components/ExcelTable/Models/OptionEntity';
import { DropDownEditor, SimpleTextEditor } from '../Editors';
// import { EditorProps } from 'react-data-grid';
import {
  DropDownEditorHandle,
  DropDownEditorProps,
} from '../Editors/DropDownEditor/DropDownEditor';
import { SimpleTextEditorType } from '../Editors/SimpleTextEditor';
import { EditorResult, TableEntities } from '../types';

// const options = {
//   resource: new OptionEntity('resource', 'Р'),
//   reef: new OptionEntity('reef', 'З'),
// };

// interface IProps extends React.PropsWithChildren<EditorProps<GridCellProperties>> {
//   ref: any;
//   options: any;
// }

const geoCategoryTypeEditor = () => ({
  editor: forwardRef(
    (props: DropDownEditorProps, ref): JSX.Element =>
      React.createElement(DropDownEditor, { ...props }),
  ),
});

interface ISimpleTextEditor {
  editor: SimpleTextEditorType;
}

interface IGeoCategoryEditor {
  editor: ForwardRefRenderFunction<
    typeof DropDownEditor,
    React.Ref<DropDownEditorHandle>
  >;
}

const geoCategoryEditor = (): ISimpleTextEditor => ({
  editor: SimpleTextEditor,
});

const getEmptyEditor = (): EditorResult => ({ editor: undefined });

export function getEditor(
  type: TableEntities = TableEntities.NONE,
): EditorResult | ISimpleTextEditor | IGeoCategoryEditor {
  switch (type) {
    case TableEntities.GEO_CATEGORY_TYPE:
      return geoCategoryTypeEditor() as IGeoCategoryEditor;

    case TableEntities.GEO_CATEGORY:
    case TableEntities.RISK:
      return geoCategoryEditor();

    default:
      return getEmptyEditor();
  }
}
