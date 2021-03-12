import React, { useContext, useMemo } from 'react';
import { RowsChangeData } from 'react-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useMount } from '@gpn-prototypes/vega-ui';
import {
  CommonTableColumn,
  ExcelTable,
  GridColumn,
  GridRow,
  SelectedCell,
  TableEntities,
} from 'components/ExcelTable';
import { ProjectContext } from 'components/Providers';
import { useGetError } from 'hooks';
import { filter, flow, map, set, some } from 'lodash/fp';
import { loadTableData } from 'services/loadTableData';
import projectService from 'services/ProjectService';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { Nullable } from 'types';

interface IProps {
  onSelect?: (data: Nullable<SelectedCell>) => void;
}

export const Table: React.FC<IProps> = ({ onSelect = (): void => {} }) => {
  const dispatch = useDispatch();
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { projectId } = useContext(ProjectContext);
  const reduxTableData = useSelector(({ table }: RootState) => table);
  const [, errors] = useGetError();
  const treeFilterData = useSelector(({ tree }: RootState) => tree.filter);
  const isTreeFilterActive =
    treeFilterData.rows.length && treeFilterData.columns.length;
  const filteredData = useMemo(() => {
    const rowIsFulfilled = (row: GridRow): boolean =>
      flow(
        filter(({ type }) => type === TableEntities.GEO_CATEGORY),
        map(({ key, name }: GridColumn) => ({
          key,
          name,
        })),
        some(({ key }: { key: string }) => Boolean(key !== 'id' && row[key])),
      )(reduxTableData.columns);

    if (isTreeFilterActive) {
      return {
        ...reduxTableData,
        columns: reduxTableData.columns.filter(
          (column) => !treeFilterData.columns.includes(column.key),
        ),
        rows: reduxTableData.rows.filter(
          (row, idx) =>
            treeFilterData.rows.includes(idx) || !rowIsFulfilled(row),
        ),
      };
    }
    return reduxTableData;
  }, [
    reduxTableData,
    treeFilterData.columns,
    treeFilterData.rows,
    isTreeFilterActive,
  ]);

  const handleSetRows = (
    data: GridRow[],
    rowsChangeData?: RowsChangeData<GridRow>,
  ): void => {
    const updatedRows = data.filter((value, idx) =>
      rowsChangeData?.indexes?.includes(idx),
    );
    const isGeoCategoryColumn =
      TableEntities.GEO_CATEGORY ===
      (rowsChangeData?.column as GridColumn).type;

    const newRows = reduxTableData.rows.map((row) => {
      const rowIdx = updatedRows.findIndex(
        (updatedRow: GridRow) => updatedRow.id === row.id,
      );

      if (rowIdx !== -1 && isTreeFilterActive && isGeoCategoryColumn) {
        const parentRowIdx = treeFilterData.rows[0];
        const columnKeys = treeFilterData.columns;

        return flow(
          ...columnKeys.map((key) =>
            set([key], reduxTableData.rows[parentRowIdx][key]),
          ),
        )(updatedRows[rowIdx]);
      }

      if (rowIdx !== -1) {
        return updatedRows[rowIdx];
      }

      return row;
    });

    dispatch(tableDuck.actions.updateRows(newRows));
  };

  const handleSetColumns = (data: GridColumn[]): void => {
    dispatch(tableDuck.actions.updateColumns(data));
  };

  const handleRowClick = ({
    rowIdx,
    row,
    column,
  }: {
    rowIdx: number;
    row: GridRow;
    column: CommonTableColumn;
  }): void => {
    if (column.type === TableEntities.CALC_PARAM) {
      // TODO: to remove pass column objet
      // onSelect(
      //   row[column.key] || {
      //     value: '',
      //     args: undefined,
      //   },
      // );
      onSelect({ rowIdx, row, column });
    } else {
      onSelect(null);
    }
  };

  useMount(() => {
    projectService.init({
      client,
      projectId,
    });

    loadTableData(dispatch);
  });

  useMount(() => {
    dispatch(tableDuck.actions.resetState());
  });

  return (
    <ExcelTable
      data={filteredData}
      errors={errors}
      setColumns={handleSetColumns}
      setRows={handleSetRows}
      onRowClick={handleRowClick}
    />
  );
};
