import React from 'react';
import classNames from 'classnames';
import { InputEditor } from 'components/ExcelTable/Editors';
import { ResourceIcon } from 'components/ExcelTable/Icons';
import {
  HeaderRendererProps,
  TableEntities,
} from 'components/ExcelTable/types';

import { DraggableHeader } from '../DraggableHeader';

import styles from '../Header.module.css';

export default React.memo<HeaderRendererProps>(function DefaultHeader(props) {
  const { column, setColumnProps, handleColumnsReorder } = props;
  const { name, idx: columnIdx, type, headerId } = column;

  const editor = (
    <InputEditor idx={columnIdx} name={name} setColumnProps={setColumnProps} />
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

  return (
    <DraggableHeader
      {...props}
      className={classNames(
        type === TableEntities.CALC_PARAM && styles.CalcParamHeader,
      )}
      onColumnsReorder={handleColumnsReorder}
      onDoubleClick={(): void => {
        setColumnProps(columnIdx, { isRenaming: true });
      }}
      editor={editor}
      beforeContent={beforeContentByType}
    />
  );
});
