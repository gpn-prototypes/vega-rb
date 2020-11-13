import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import ExcelTable from 'components/ExcelTable';
import { SelectedCell, TableEntities } from 'components/ExcelTable/types';
import { ProjectContext } from 'components/Providers';
import {
  GET_VERSION,
  LOAD_PROJECT,
} from 'pages/Scheme/components/Table/queries';
import { getGraphqlUri } from 'pages/Scheme/helpers';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { Nullable } from 'types';
import { unpackTableData } from 'utils';

interface IProps {
  onSelect?: (data: Nullable<SelectedCell>) => void;
}

export const Table: React.FC<IProps> = ({ onSelect = (): void => {} }) => {
  const { projectId } = useContext(ProjectContext);
  const reduxTableData = useSelector(({ table }: RootState) => table);
  const dispatch = useDispatch();
  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: GET_VERSION,
        variables: {
          vid: projectId,
        },
      })
      .then((versionRes) => {
        client
          .query({
            query: LOAD_PROJECT,
            context: {
              uri: getGraphqlUri(projectId),
            },
          })
          .then((res) => {
            const { project } = res.data.resourceBase.project.loadFromDatabase;
            if (project) {
              dispatch(
                tableDuck.actions.init(
                  unpackTableData(
                    project.conceptions[0].structure,
                    versionRes.data.project.version,
                    [],
                  ),
                ),
              );
            }
          });
      });
  }, [client, dispatch, projectId]);

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
