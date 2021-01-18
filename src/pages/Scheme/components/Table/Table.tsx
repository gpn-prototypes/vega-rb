import React, { useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useMount, useUnmount } from '@gpn-prototypes/vega-ui';
import ExcelTable from 'components/ExcelTable';
import {
  GridRow,
  SelectedCell,
  TableEntities,
} from 'components/ExcelTable/types';
import { ProjectContext } from 'components/Providers';
import projectService from 'services/ProjectService';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { Nullable } from 'types';
import { unpackTableData } from 'utils';

interface IProps {
  onSelect?: (data: Nullable<SelectedCell>) => void;
}

export const Table: React.FC<IProps> = ({ onSelect = (): void => {} }) => {
  const dispatch = useDispatch();
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { projectId } = useContext(ProjectContext);
  const reduxTableData = useSelector(({ table }: RootState) => table);
  const treeFilterData = useSelector(({ tree }: RootState) => tree.filter);

  const filteredData = useMemo(() => {
    const rowIsFulfilled = (row: GridRow): boolean => {
      const structureColumnsKeys = reduxTableData.columns
        .filter(({ type }) => type === TableEntities.GEO_CATEGORY)
        .map(({ key, name }) => ({
          key,
          name,
        }));
      return structureColumnsKeys.some(({ key }) => key !== 'id' && row[key]);
    };

    if (treeFilterData.rows.length && treeFilterData.columns.length) {
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
  }, [reduxTableData, treeFilterData.columns, treeFilterData.rows]);

  useMount(() => {
    projectService.init({
      client,
      projectId,
    });

    projectService
      .getResourceBaseData()
      .then(() => projectService.getStructure())
      .then((structure) => {
        const data = unpackTableData(structure, projectService.version);
        dispatch(tableDuck.actions.initState(data));
      });
  });

  useUnmount(() => {
    // dispatch(tableDuck.actions.resetState());
  });

  return (
    <ExcelTable
      data={filteredData}
      setColumns={(data): void => {
        dispatch(tableDuck.actions.updateColumns(data));
      }}
      setRows={(data): void => {
        dispatch(tableDuck.actions.updateRows(data));
      }}
      onRowClick={(rowIdx, row, column): void => {
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
      }}
    />
  );
};
