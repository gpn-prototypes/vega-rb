import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, SplitPanes, useSidebar } from '@gpn-prototypes/vega-ui';
import { DistributionSettings } from 'components/DistributionSettings';
import {
  GridColumn,
  SelectedCell,
  TableEntities,
} from 'components/ExcelTable/types';
import { HierarchyLevelList } from 'components/HierarchyLevelList';
import TreeEditor from 'pages/Scheme/components/TreeEditor/TreeEditor';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { Nullable } from 'types';

import CalculateButton from './components/CalculateButton';
import Table from './components/Table';

import style from './Scheme.module.css';

const SchemePage: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedCell, setSelectedCell] = useState<Nullable<SelectedCell>>(
    null,
  );
  const treeEditorRef = useRef<HTMLDivElement>(null);
  const [isShownTree, setIsShownTree] = useState(false);
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
  const handleEndResize = (): void => {
    if (treeEditorRef?.current?.clientWidth) {
      setIsShownTree(Number(treeEditorRef?.current?.clientWidth) > 100);
    }
  };
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
      <SplitPanes split="vertical" onResizeEnd={handleEndResize}>
        <SplitPanes.Pane aria-label="tree" initialSize="24px" min="24px">
          <TreeEditor
            rows={data.rows}
            columns={data.columns}
            isOpen={isShownTree}
            ref={treeEditorRef}
          />
        </SplitPanes.Pane>
        <SplitPanes.Pane aria-label="table">
          <div className={style.Content}>
            <div className={style.LeftPanel}>
              <Table onSelect={setSelectedCell} />
            </div>
            <div className={style.RightPanel} hidden={!selectedCell}>
              {selectedCell && (
                <DistributionSettings selectedCell={selectedCell} />
              )}
            </div>
          </div>
        </SplitPanes.Pane>
      </SplitPanes>
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
