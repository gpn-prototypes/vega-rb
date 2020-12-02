import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Tree } from '@gpn-prototypes/vega-tree';
import { ResourceIcon } from 'components/ExcelTable/Icons';
import { GridCollection, TableEntities } from 'components/ExcelTable/types';
import {
  getNodeListFromTableData,
  searchInTree,
} from 'pages/Scheme/components/TreeEditor/helpers';
import { TargetData } from 'pages/Scheme/components/TreeEditor/types';
import tableDuck from 'store/tableDuck';
import { getColumnsByType } from 'utils/getColumnsByType';

const icons = {
  'blue-line': <ResourceIcon />,
  'orange-line': <ResourceIcon />,
  'red-line': <ResourceIcon />,
};
interface StructureTreeEditorProps {
  data: GridCollection;
}

export const TreeEditor: React.FC<StructureTreeEditorProps> = ({ data }) => {
  const dispatch = useDispatch();
  const tree = useMemo(() => getNodeListFromTableData(data), [data]);
  const domainEntitiesColumns = useMemo(
    () => getColumnsByType(data.columns, TableEntities.GEO_CATEGORY),
    [data.columns],
  );
  const onSelect = useCallback(
    (selectedItems: TargetData[]) => {
      if (selectedItems.length) {
        const node = searchInTree(tree, selectedItems[0].id);
        if (node) {
          const columnIdx = node.data?.position?.[0].columnIdx as number;
          dispatch(
            tableDuck.actions.setColumnsFilter(
              domainEntitiesColumns
                .filter((_, idx) => columnIdx >= idx)
                .map(({ key }) => key),
            ),
          );
        }
      } else {
        dispatch(tableDuck.actions.setColumnsFilter([]));
      }
    },
    [domainEntitiesColumns, dispatch, tree],
  );

  return (
    <Tree
      nodeList={tree}
      icons={icons}
      isDndEnable={false}
      isContextMenuEnable
      onSelectItem={onSelect}
      withVisibilitySwitcher
      withMultiSelect={false}
    />
  );
};
