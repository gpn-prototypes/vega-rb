import React from 'react';
import classNames from 'classnames';

import DraggableHeader from '../DraggableHeader';
import { InputEditor } from '../Editors';
import { ResourceIcon } from '../Icons';
import { HeaderRendererProps, TableEntities } from '../types';

import styles from '../DraggableHeader/DraggableHeader.module.css';

export default React.memo<HeaderRendererProps>(function Header(props) {
  const { column, setColumnProps, handleColumnsReorder, onBlurHandler } = props;
  const { name, idx: columnIdx, type, headerId } = column;

  const editor = (
    <InputEditor
      idx={columnIdx}
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

  return (
    <DraggableHeader
      {...props}
      className={classNames(
        type === TableEntities.CALC_PARAM && styles.CalcParamHeader,
      )}
      onColumnsReorder={handleColumnsReorder}
      onDoubleClick={(): void => {
        setColumnProps(columnIdx, 'isRenaming', true);
      }}
      editor={editor}
      beforeContent={beforeContentByType}
    />
  );
});
