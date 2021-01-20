import React from 'react';
import classNames from 'classnames';
import { InputEditor } from 'components/ExcelTable/Editors';
import { TableEntities } from 'components/ExcelTable/enums';
import { ResourceIcon } from 'components/ExcelTable/Icons';
import { HeaderRendererProps } from 'components/ExcelTable/types';

import { DraggableHeader } from '../DraggableHeader';

import styles from '../Header.module.css';

const PrecedingContent = (type: TableEntities, headerId: string) => (
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

export default React.memo<HeaderRendererProps>(function DefaultHeader(props) {
  const { column, setColumnProps, handleColumnsReorder } = props;
  const { name, idx: columnIdx, type, headerId } = column;

  const editor = (
    <InputEditor
      idx={columnIdx}
      name={name as string}
      setColumnProps={setColumnProps}
    />
  );

  return (
    <DraggableHeader
      onAllRowsSelectionChange={() => {}}
      allRowsSelected={false}
      column={props.column}
      className={classNames(
        type === TableEntities.CALC_PARAM && styles.CalcParamHeader,
      )}
      onColumnsReorder={handleColumnsReorder}
      onDoubleClick={(): void => {
        setColumnProps(columnIdx, { isRenaming: true });
      }}
      editor={editor}
      precedingContent={PrecedingContent(type!, headerId!)}
    />
  );
});
