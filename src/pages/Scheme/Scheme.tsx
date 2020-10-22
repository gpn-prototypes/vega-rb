import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@gpn-prototypes/vega-button';
import { Sidebar, useSidebar } from '@gpn-prototypes/vega-sidebar';
import {
  GridColumn,
  SelectedCell,
  TableEntities,
} from 'components/ExcelTable/types';
import HierarchyLevelList from 'pages/Scheme/components/HierarchyLevelList';
import { HierarchyLevelItem } from 'pages/Scheme/components/HierarchyLevelList/HierarchyLevelList';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { Nullable } from 'types';

import CalculateButton from './components/CalculateButton';
import DistributionSettings from './components/DistributionSettings';
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
    dispatch(tableDuck.actions.updateColumns(columns));
    handleClose();
  };

  return (
    <div className={style.SchemePage}>
      <div className={style.Header}>
        <Button
          label="Настройка уровней иерархии"
          view="ghost"
          onClick={handleOpen}
          className={style.ButtonStructure}
        />
        <Button label="Данные" view="ghost" className={style.ButtonData} />
        <CalculateButton />
      </div>
      <div className={style.Content}>
        <div className={style.LeftPanel}>
          <Table onSelect={setSelectedCell} />
        </div>
        <div className={style.RightPanel} hidden={!selectedCell}>
          {selectedCell && <DistributionSettings selectedCell={selectedCell} />}
        </div>
      </div>
      <Sidebar isOpen={isOpen} onClose={handleClose}>
        <>
          <Sidebar.Header hasMinimizeButton={false}>
            Настройка уровней иерархии
          </Sidebar.Header>
          <Sidebar.Body>
            <HierarchyLevelList
              items={geoCategoryColumns as HierarchyLevelItem[]}
              onSubmit={(columns) =>
                updateColumns([
                  ...columns,
                  ...data.columns.filter(
                    ({ type }) => type !== TableEntities.GEO_CATEGORY,
                  ),
                ])
              }
            />
          </Sidebar.Body>
        </>
      </Sidebar>
    </div>
  );
};

export default SchemePage;
