import React, { ReactText } from 'react';
import { HeaderRendererProps } from 'react-data-grid';
import classNames from 'classnames';

import { withContextMenu } from '../ContextMenu';
import DraggableHeader from '../DraggableHeader';
import { InputEditor } from '../Editors';
import { ResourceIcon } from '../Icons';
import {
  GridRow,
  HEADER_CONTEXT_ID,
  IGridColumn,
  TableEntities,
} from '../types';

import styles from '../DraggableHeader/DraggableHeader.module.css';

export function Header(
  props: HeaderRendererProps<GridRow> & {
    column: IGridColumn;
    onBlurHandler: (idx: number) => void;
    setColumnProps: (
      columnIdx: number,
      property: string,
      value: ReactText | boolean,
    ) => void;
    handleColumnsReorder: (sourceKey: string, targetKey: string) => void;
  },
): JSX.Element {
  const { column, setColumnProps, handleColumnsReorder, onBlurHandler } = props;
  const { name, idx, type, headerId } = column;

  const editor = (
    <InputEditor
      idx={idx}
      name={name}
      setColumnProps={setColumnProps}
      onBlurHandler={onBlurHandler}
    />
  );
  const beforeContentByType = (
    <>
      {type === TableEntities.GEO_CATEGORY && (
        <div className={styles.WrapperIcon}>
          <ResourceIcon color="#00eeaa" className={styles.Icon} />
        </div>
      )}
      {type === TableEntities.CALC_PARAM && (
        <div className={styles.HeaderId}>{headerId}</div>
      )}
    </>
  );

  return withContextMenu(
    <DraggableHeader
      {...props}
      className={classNames(
        type === TableEntities.CALC_PARAM && styles.CalcParamHeader,
      )}
      onColumnsReorder={handleColumnsReorder}
      onDoubleClick={(): void => {
        setColumnProps(props.column.idx, 'isRenaming', true);
      }}
      editor={editor}
      beforeContent={beforeContentByType}
    />,
    {
      id: HEADER_CONTEXT_ID,
      collect: () => ({ idx: props.column.idx }),
    },
  );
}