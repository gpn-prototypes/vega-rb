import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@gpn-prototypes/vega-button';
import { useSidebar } from '@gpn-prototypes/vega-sidebar';
import {
  GridColumn,
  SelectedCell,
  TableEntities,
} from 'components/ExcelTable/types';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { Nullable } from 'types';

import CalculateButton from './components/CalculateButton';
import DistributionSettings from './components/DistributionSettings';
import HierarchyLevelList from './components/HierarchyLevelList';
import Table from './components/Table';

import style from './Scheme.module.css';

const SchemePage: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedCell, setSelectedCell] = useState<Nullable<SelectedCell>>(
    null,
  );

  const data = useSelector(({ table }: RootState) => table);
  const geoCategoryColumns = data.columns.filter(
    ({ type }) => type === TableEntities.GEO_CATEGORY,
  );

  const {
    state: { isOpen },
    close: handleClose,
    open: handleOpen,
  } = useSidebar({
    isOpen: false,
    isMinimized: false,
  });

  const updateColumns = (columns: GridColumn[]) => {
    dispatch(
      tableDuck.actions.updateColumnsByType({
        columns,
        type: TableEntities.GEO_CATEGORY,
      }),
    );
    handleClose();
  };

  return (
    <div className={style.SchemePage}>
      <div className={style.Header}>
        <CalculateButton />
        <Button
          label="Настройка уровней иерархии"
          view="ghost"
          onClick={handleOpen}
          className={style.ButtonStructure}
        />
      </div>
      <div className={style.Content}>
        <div className={style.LeftPanel}>
          <Table onSelect={setSelectedCell} />
        </div>
        <div className={style.RightPanel} hidden={!selectedCell}>
          {selectedCell && <DistributionSettings selectedCell={selectedCell} />}
        </div>
      </div>
      <HierarchyLevelList
        isOpen={isOpen}
        handleClose={handleClose}
        items={geoCategoryColumns}
        onSubmit={(columns) => updateColumns(columns)}
      />
    </div>
  );
};

export default SchemePage;
