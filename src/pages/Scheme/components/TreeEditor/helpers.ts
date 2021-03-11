import { TreeItem } from '@gpn-prototypes/vega-ui';
import arrayToTree from 'array-to-tree';
import { TableEntities } from 'components/ExcelTable/enums';
import { GridColumn, GridRow } from 'components/ExcelTable/types';
import { get, groupBy, mergeWith } from 'lodash/fp';
import { getRowId } from 'utils/getRowId';
import { v4 as uuid } from 'uuid';

import { CellPosition, TreeItemData } from './types';

const getTreeNodeItem = (
  row: GridRow,
  rowIdx: number,
  columnKey: string,
  columnIdx: number,
  nodes?: TreeItem<TreeItemData>[],
): TreeItem<TreeItemData> => {
  const isRoot = columnIdx === 0;

  const parentPos = isRoot
    ? undefined
    : ({
        rowIdx,
        columnIdx: columnIdx - 1,
      } as CellPosition);

  const parentId = isRoot
    ? undefined
    : nodes?.find((node) =>
        node.data?.position.some(
          (pos) =>
            pos.rowIdx === parentPos?.rowIdx &&
            pos.columnIdx === parentPos.columnIdx,
        ),
      )?.id;

  const name = row[columnKey]?.value ? row[columnKey]?.value : '? (заглушка)';

  return {
    name: name as string,
    data: {
      position: [
        {
          rowIdx,
          columnIdx,
        },
      ],
    },
    parentId,
    iconId: 'blue-line',
    nodeList: [],
    id: isRoot ? '' : uuid(),
  };
};

const mergeCustomizer = (
  objValue: string | number | Array<string | number>,
  srcValue: string | number | Array<string | number>,
  k: string,
) => {
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return objValue.concat(srcValue);
  }

  if (k === 'id') {
    return uuid();
  }

  return undefined;
};

export function searchInTree<T>(
  tree: TreeItem<T>[],
  value: string | number,
  key: keyof TreeItem = 'id',
  reverse = false,
): TreeItem<T> | null {
  const stack = [tree[0]];

  while (stack.length) {
    const node = stack[reverse ? 'pop' : 'shift']();
    if (node) {
      if (node[key] === value) return node;
      if (node.nodeList) {
        stack.push(...node.nodeList);
      }
    }
  }
  return null;
}

export function mergeObjectsInUnique<T>(array: T[], properties: string[]): T[] {
  const newArray = new Map();

  array.forEach((item: T) => {
    const propertyValue = properties.reduce((prev, curr) => {
      return `${prev}${get(curr, item)}`;
    }, '');

    if (newArray.has(propertyValue)) {
      newArray.set(
        propertyValue,
        mergeWith(mergeCustomizer, item, newArray.get(propertyValue)),
      );
    } else {
      newArray.set(propertyValue, item);
    }
  });
  return Array.from(newArray.values());
}

export function getNodeListFromTableData(
  data: {
    columns: GridColumn[];
    rows: GridRow[];
  },
  projectName: string,
): TreeItem<TreeItemData>[] {
  const { rows, columns } = data;

  const structureColumnsKeys = columns
    .filter(
      ({ type, visible }) =>
        type === TableEntities.GEO_CATEGORY && visible?.tree,
    )
    .map(({ key, name }) => ({
      key,
      name,
    }));

  const filledRows = rows.filter((row) =>
    structureColumnsKeys.some(({ key }) => key !== 'id' && row[key]),
  );
  const nodes: TreeItem<TreeItemData>[] = [];

  structureColumnsKeys.forEach(({ key: columnKey }, columnIdx) => {
    if (columnIdx === 0) {
      const map = groupBy(
        (item) => item.name,
        filledRows.map((row) =>
          getTreeNodeItem(row, getRowId(row), columnKey, columnIdx),
        ),
      );
      const items = Object.keys(map)
        .map((key) =>
          map[key].reduce(
            (prev, curr) => mergeWith(mergeCustomizer, prev, curr),
            {},
          ),
        )
        .flat(1) as TreeItem<TreeItemData>[];

      nodes.push(...items);
    } else {
      const items = filledRows.map((row) =>
        getTreeNodeItem(row, getRowId(row), columnKey, columnIdx, nodes),
      );

      if (structureColumnsKeys.length - 1 === columnIdx) {
        nodes.push(...items);
      } else {
        nodes.push(
          ...mergeObjectsInUnique<TreeItem<TreeItemData>>(items, [
            'parentId',
            'name',
          ]),
        );
      }
    }
  });

  const nodeList = arrayToTree(nodes, {
    parentProperty: 'parentId',
    customID: 'id',
    childrenProperty: 'nodeList',
  });

  return [
    {
      name: projectName,
      isDraggable: false,
      id: 'root',
      iconId: 'blue-line',
      nodeList,
    },
  ];
}
