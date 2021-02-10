import React, { PropsWithChildren, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Tree } from '@gpn-prototypes/vega-ui';
import { GridColumn, GridRow, TableEntities } from 'components/ExcelTable';
import { ResourceIcon } from 'components/ExcelTable/Icons';
import { cnTreeEditor } from 'pages/Scheme/components/TreeEditor/cn-tree-editor';
import {
  getNodeListFromTableData,
  searchInTree,
} from 'pages/Scheme/components/TreeEditor/helpers';
import { TargetData } from 'pages/Scheme/components/TreeEditor/types';
import treeFilterDuck from 'store/treeDuck';
import { RootState } from 'store/types';
import { getColumnsByType } from 'utils/getColumnsByType';

import './TreeEditor.css';

const icons = {
  'blue-line': <ResourceIcon color="#00eeaa" />,
  'orange-line': <ResourceIcon color="#00eeaa" />,
  'red-line': <ResourceIcon color="#00eeaa" />,
};

interface StructureTreeEditorProps {
  columns: GridColumn[];
  rows: GridRow[];
  isOpen: boolean;
}

export default React.forwardRef<HTMLDivElement, StructureTreeEditorProps>(
  function TreeEditor(
    { rows, columns, isOpen }: PropsWithChildren<StructureTreeEditorProps>,
    ref,
  ): React.ReactElement {
    const dispatch = useDispatch();
    const projectName = useSelector(({ project }: RootState) => project.name);
    const tree = useMemo(
      () => getNodeListFromTableData({ rows, columns }, projectName),
      [rows, columns, projectName],
    );
    const domainEntitiesColumns = useMemo(
      () => getColumnsByType(columns, TableEntities.GEO_CATEGORY),
      [columns],
    );
    const onSelect = (selectedItems: TargetData[]) => {
      if (selectedItems.length) {
        const node = searchInTree(tree, selectedItems[0].id);
        if (node && node.data) {
          const { columnIdx } = node.data.position[0];
          const rowsIds = node.data.position.map(({ rowIdx }) => rowIdx);
          dispatch(
            treeFilterDuck.actions.setFilter({
              columns: domainEntitiesColumns
                .filter(
                  (_, idx) =>
                    columnIdx >= idx &&
                    idx !== domainEntitiesColumns.length - 1,
                )
                .map(({ key }) => key),
              rows: rowsIds,
            }),
          );
        } else {
          dispatch(treeFilterDuck.actions.resetState());
        }
      } else {
        dispatch(treeFilterDuck.actions.resetState());
      }
    };

    return (
      <div className={cnTreeEditor()} ref={ref}>
        <Text
          className={cnTreeEditor('Placeholder').state({ open: isOpen })}
          color="ghost"
          size="xs"
        >
          Дерево проекта
        </Text>
        <div className={cnTreeEditor('Content').state({ open: isOpen })}>
          <Tree
            nodeList={tree}
            icons={icons}
            isDndEnable={false}
            isContextMenuEnable={false}
            onSelectItem={onSelect}
            withVisibilitySwitcher={false}
            withMultiSelect={false}
          />
        </div>
      </div>
    );
  },
);
