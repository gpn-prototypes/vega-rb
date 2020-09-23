import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import ExcelTable from 'components/ExcelTable';
import { SelectedCell, TableEntities } from 'components/ExcelTable/types';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { IProjectStructure, Nullable } from 'types';
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
  onSelect?: (data: Nullable<SelectedCell>) => void;
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
