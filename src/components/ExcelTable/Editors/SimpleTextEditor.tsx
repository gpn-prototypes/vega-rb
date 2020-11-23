import React, { ChangeEvent } from 'react';
import { EditorProps } from 'react-data-grid';
import { GridRow } from 'components/ExcelTable/types';

type Props = EditorProps<GridRow | undefined>;

export const SimpleTextEditor: React.FC<Props> = ({
  row,
  column,
  onRowChange,
  onClose,
}) => {
  // private readonly input: React.RefObject<Nullable<HTMLInputElement>>;

  // constructor(props: IProps) {
  //   super(props);
  //   this.input = React.createRef();
  // }

  // getInputNode(): HTMLInputElement | null {
  //   return this.input.current;
  // };

  // getValue(): GridRow {
  //   return {
  //     [this.props.column.key]: {
  //       value: this.input.current?.value || '',
  //     },
  //   };
  // }

  // return React.createElement('input', {
  //   className: 'rdg-text-editor',
  //   ref: inputRef,
  //   defaultValue: this.props.value?.value,
  //   onBlur: onRowChange,
  // });

  const onCommit = (event: ChangeEvent<HTMLInputElement>) => {
    return {
      ...row,
      [column.key]: {
        value: event.target.value || '',
      },
    };
  };

  return (
    <input
      className="rdg-text-editor"
      defaultValue=""
      onChange={(event) => onRowChange(onCommit(event))}
      onBlur={() => onClose(true)}
    />
  );
};
