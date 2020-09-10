import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import ExcelTable from 'components/ExcelTable';
import {
  GridRow,
  IGridColumn,
  TableEntities,
} from 'components/ExcelTable/types';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { IProjectStructure } from 'types';
import { Action } from 'typescript-fsa';
import { mockTableRows, unpackData } from 'utils';

import { GET_TABLE_TEMPLATE } from './queries';

export interface TemplateProjectData {
  project: {
    template: {
      structure: IProjectStructure;
    };
  };
}

interface IProps {
  onSelect?: (status: boolean) => void;
}

export const Table: React.FC<IProps> = ({ onSelect = (): void => {} }) => {
  const { loading, error, data: respData } = useQuery<TemplateProjectData>(
    GET_TABLE_TEMPLATE,
  );
  const reduxTableData = useSelector(({ table }: RootState) => table);
  const dispatch = useDispatch();
  const templateStructure = respData?.project.template.structure;

  useEffect(() => {
    if (!reduxTableData?.columns.length && templateStructure) {
      const { columns } = unpackData(templateStructure);
      dispatch(tableDuck.actions.updateColumns(columns));
    }

    if (!reduxTableData?.rows.length) {
      dispatch(tableDuck.actions.updateRows(mockTableRows));
    }
  }, [dispatch, reduxTableData, templateStructure]);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <ExcelTable
      data={reduxTableData}
      setColumns={(data): Action<IGridColumn[]> =>
        dispatch(tableDuck.actions.updateColumns(data))
      }
      setRows={(data): Action<GridRow[]> =>
        dispatch(tableDuck.actions.updateRows(data))
      }
      onRowClick={(column): void => {
        if (column.type === TableEntities.CALC_PARAM) onSelect(false);
        else onSelect(true);
      }}
    />
  );
};
