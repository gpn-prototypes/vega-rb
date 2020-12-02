import { TreeItem } from '@gpn-prototypes/vega-ui';
import arrayToTree from 'array-to-tree';
import {
  GridColumn,
  GridRow,
  TableEntities,
} from 'components/ExcelTable/types';
import { get, groupBy, mergeWith } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { TreeItemData } from './types';

export const structure = [
  {
    name: 'Концепция 1',
    isDraggable: false,
    id: 'root',
    iconId: 'blue-line',
    nodeList: [],
  },
];

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
      return `${prev}${get(item, curr)}`;
    }, '');
    if (newArray.has(propertyValue)) {
      newArray.set(
        propertyValue,
        mergeWith(
          item,
          newArray.get(propertyValue),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line consistent-return
          (objValue, srcValue, k) => {
            if (Array.isArray(objValue)) {
              return objValue.concat(srcValue);
            }
            if (k === 'id') {
              return uuidv4();
            }
          },
        ),
      );
    } else {
      newArray.set(propertyValue, item);
    }
  });
  return Array.from(newArray.values());
}
export function getNodeListFromTableData(data: {
  columns: GridColumn[];
  rows: GridRow[];
}): TreeItem<TreeItemData>[] {
  const { rows, columns } = data;

  const structureColumnsKeys = columns
    .filter(({ type }) => type === TableEntities.GEO_CATEGORY)
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
        filledRows.map((row, rowIdx) => {
          return {
            name: row[columnKey]?.value,
            data: {
              position: [
                {
                  rowIdx,
                  columnIdx,
                },
              ],
            },
            parentId: null,
            iconId: 'blue-line',
            nodeList: [],
            id: '',
          };
        }),
        (item) => item.name,
      );
      const items = Object.keys(map)
        .map((key) =>
          map[key].reduce(
            (prev, curr) =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line consistent-return
              mergeWith(prev, curr, (objValue, srcValue, k) => {
                if (Array.isArray(objValue)) {
                  return objValue.concat(srcValue);
                }
                if (k === 'id') {
                  return uuidv4();
                }
              }),
            {},
          ),
        )
        .flat(1) as TreeItem<TreeItemData>[];
      nodes.push(...items);
    } else {
      const items = filledRows.map((row, rowIdx) => {
        const parentPos = {
          rowIdx,
          columnIdx: columnIdx - 1,
        };

        return {
          name: row[columnKey]?.value,
          data: {
            position: [
              {
                rowIdx,
                columnIdx,
              },
            ],
            parentPos,
          },
          parentId: nodes.find((node) =>
            node.data?.position.some(
              (pos) =>
                pos.rowIdx === parentPos.rowIdx &&
                pos.columnIdx === parentPos.columnIdx,
            ),
          )?.id,
          iconId: 'blue-line',
          nodeList: [],
          id: uuidv4(),
        } as TreeItem<TreeItemData>;
      });

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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  structure[0].nodeList = arrayToTree(nodes, {
    parentProperty: 'parentId',
    customID: 'id',
    childrenProperty: 'nodeList',
  });

  return structure;
}
