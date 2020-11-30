import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import {
  Button,
  SplitPanes,
  useInterval,
  useSidebar,
} from '@gpn-prototypes/vega-ui';
import { RecentlyEditedAlert } from 'components/CompetitiveAccess/RecentlyEditedAlert';
import { Conceptions } from 'components/Conceptions';
import { DistributionSettings } from 'components/DistributionSettings';
import {
  GridColumn,
  SelectedCell,
  TableEntities,
} from 'components/ExcelTable/types';
import { HierarchyLevelList } from 'components/HierarchyLevelList';
import { ProjectContext } from 'components/Providers';
import { TreeEditor } from 'pages/Scheme/components/TreeEditor';
import projectService from 'services/ProjectService';
import competitiveAccessDuck from 'store/competitiveAccessDuck';
import projectDuck from 'store/projectDuck';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { Nullable } from 'types';

import CalculateButton from './components/CalculateButton';
import Table from './components/Table';
import { cnScheme } from './cn-scheme';

import './Scheme.css';

const PANELS_SIZE = {
  left: '190px',
  right: '400px',
};

const SchemePage: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<Nullable<SelectedCell>>(
    null,
  );
  const [isShownTree, setIsShownTree] = useState(true);

  const dispatch = useDispatch();
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { projectId } = useContext(ProjectContext);
  const data = useSelector(({ table }: RootState) => table);

  const treeEditorRef = useRef<HTMLDivElement>(null);

  const handleEndResize = (): void => {
    if (treeEditorRef?.current?.clientWidth) {
      setIsShownTree(Number(treeEditorRef?.current?.clientWidth) > 100);
    }
  };

  const isRecentlyEdited = useSelector(
    ({ competitiveAccess }: RootState) => competitiveAccess.isRecentlyEdited,
  );

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

  useEffect(() => {
    projectService.init({
      client,
      projectId,
    });
    projectService
      .getProjectName()
      .then((projectName) =>
        dispatch(projectDuck.actions.updateProjectName(projectName)),
      );
  }, [client, dispatch, projectId]);

  useInterval(30000, () => {
    projectService
      .getProjectRecentlyEdited()
      .then((recentlyEdited) => {
        if (recentlyEdited === isRecentlyEdited) {
          return;
        }

        dispatch(
          competitiveAccessDuck.actions.setRecentlyEdited(recentlyEdited),
        );
      })
      .catch(() => competitiveAccessDuck.actions.setRecentlyEdited(false));
  });

  return (
    <div className={cnScheme.toString()}>
      <div className={cnScheme('Header')}>
        <CalculateButton />
        <Button
          label="Настройка уровней иерархии"
          view="ghost"
          onClick={handleOpen}
          className={cnScheme('ButtonStructure')}
        />
      </div>
      <SplitPanes
        resizerSize={0.1}
        allowResize={false}
        className={cnScheme('Content')}
      >
        <SplitPanes.Pane
          initialSize={PANELS_SIZE.left}
          min={PANELS_SIZE.left}
          max={PANELS_SIZE.left}
          className={cnScheme('LeftPanel')}
        >
          <Conceptions />
        </SplitPanes.Pane>
        <SplitPanes.Pane>
          <SplitPanes split="vertical" onResizeEnd={handleEndResize}>
            <SplitPanes.Pane
              aria-label="tree"
              initialSize="180px"
              min="24px"
              max="240px"
            >
              <TreeEditor
                rows={data.rows}
                columns={data.columns}
                isOpen={isShownTree}
                ref={treeEditorRef}
              />
            </SplitPanes.Pane>
            <SplitPanes.Pane aria-label="table">
              <div className={cnScheme('Content')}>
                <div className={cnScheme('LeftPanel')}>
                  <Table onSelect={setSelectedCell} />
                </div>
                <div className={cnScheme('RightPanel')} hidden={!selectedCell}>
                  {selectedCell && (
                    <DistributionSettings selectedCell={selectedCell} />
                  )}
                </div>
              </div>
            </SplitPanes.Pane>
          </SplitPanes>
        </SplitPanes.Pane>
        <SplitPanes.Pane
          initialSize={PANELS_SIZE.right}
          min={PANELS_SIZE.right}
          max={PANELS_SIZE.right}
          className={cnScheme('RightPanel')}
        >
          {selectedCell && (
            <DistributionSettings
              selectedCell={selectedCell}
              className={cnScheme('DistributionSettings')}
            />
          )}
        </SplitPanes.Pane>
      </SplitPanes>
      <HierarchyLevelList
        isOpen={isOpen}
        handleClose={handleClose}
        items={geoCategoryColumns}
        onSubmit={(columns) => updateColumns(columns)}
      />

      {isRecentlyEdited && <RecentlyEditedAlert />}
    </div>
  );
};

export default SchemePage;
