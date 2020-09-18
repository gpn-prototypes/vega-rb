import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import ExcelTable from 'components/ExcelTable';
import {
  GridRow,
  IGridColumn,
  SelectedCell,
  TableEntities,
} from 'components/ExcelTable/types';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { IProjectStructureTemplate } from 'types';
import { Action } from 'typescript-fsa';
import { mockTableRows, unpackData } from 'utils';

import { GET_TABLE_TEMPLATE } from './queries';

export interface TemplateProjectData {
  project: {
    template: {
      structure: IProjectStructureTemplate;
    };
  };
}

interface IProps {
  onSelect?: Dispatch<SetStateAction<SelectedCell | null>>;
}

export const Table: React.FC<IProps> = ({ onSelect = (): void => {} }) => {
  const { loading, data: respData } = useQuery<TemplateProjectData>(
    GET_TABLE_TEMPLATE,
  );
  const reduxTableData = useSelector(({ table }: RootState) => table);
  const dispatch = useDispatch();
  const templateStructure = respData?.project.template.structure;

  useEffect(() => {
    if (templateStructure) {
      if (!reduxTableData?.columns.length) {
        const { columns } = unpackData(templateStructure);
        dispatch(tableDuck.actions.updateColumns(columns));
      }
      if (!reduxTableData?.rows.length) {
        dispatch(tableDuck.actions.updateRows(mockTableRows));
      }
    }
  }, [dispatch, reduxTableData, templateStructure]);

  if (loading) return <div>Loading</div>;

  return (
    <ExcelTable
      data={reduxTableData}
      setColumns={(data): Action<IGridColumn[]> =>
        dispatch(tableDuck.actions.updateColumns(data))
      }
      setRows={(data): Action<GridRow[]> =>
        dispatch(tableDuck.actions.updateRows(data))
      }
      onRowClick={(rowIdx, row, column): void => {
        if (column.type === TableEntities.CALC_PARAM)
          onSelect({ rowIdx, row, column });
        else onSelect(null);
      }}
    />
  );
};
