import React from 'react';
import { Editor, EditorProps } from 'react-data-grid';
import { GridCellProperties, GridRow } from 'components/ExcelTable/types';
import { Nullable } from 'types';

type IProps = EditorProps<GridCellProperties | undefined>;

export class SimpleTextEditor
  extends React.Component<IProps>
  implements Editor<GridRow> {
  private readonly input: React.RefObject<Nullable<HTMLInputElement>>;

  constructor(props: IProps) {
    super(props);
    this.input = React.createRef();
  }

  getInputNode(): HTMLInputElement | null {
    return this.input.current;
  }

  getValue(): GridRow {
    return {
      [this.props.column.key]: {
        value: this.input.current?.value || '',
      },
    };
  }

  render(): React.ReactElement {
    return React.createElement('input', {
      className: 'rdg-text-editor',
      ref: this.input,
      defaultValue: this.props.value?.value,
      onBlur: this.props.onCommit,
    });
  }
}
