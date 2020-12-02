import React, { PropsWithChildren, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Tree } from '@gpn-prototypes/vega-ui';
import { ResourceIcon } from 'components/ExcelTable/Icons';
import {
  GridColumn,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';
import { cnTreeEditor } from 'pages/Scheme/components/TreeEditor/cn-tree-editor';
import {
  getNodeListFromTableData,
  searchInTree,
} from 'pages/Scheme/components/TreeEditor/helpers';
import { TargetData } from 'pages/Scheme/components/TreeEditor/types';
import tableDuck from 'store/tableDuck';
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
    const tree = useMemo(() => getNodeListFromTableData({ rows, columns }), [
      rows,
      columns,
    ]);
    const domainEntitiesColumns = useMemo(
      () => getColumnsByType(columns, TableEntities.GEO_CATEGORY),
      [columns],
    );
    const onSelect = (selectedItems: TargetData[]) => {
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
    };

    return (
      <div
        className={cnTreeEditor()}
        ref={(el) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          ref.current = el;
        }}
      >
        <div className={cnTreeEditor('Placeholder').state({ open: isOpen })}>
          Дерево проекта
        </div>
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
