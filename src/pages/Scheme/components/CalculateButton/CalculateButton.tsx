import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { Button } from '@gpn-prototypes/vega-ui';
import { saveAs } from 'file-saver';
import { TableError } from 'generated/graphql';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { packTableData } from 'utils';

import { CALCULATION_PROJECT } from '../../mutations';
import { GET_TABLE_TEMPLATE } from '../Table/queries';
import { TemplateProjectData } from '../Table/Table';

const DOWNLOAD_RESULT_ROUTE = '`files/calculation_result/`';

export const CalculateButton: React.FC = () => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.table);

  const handleClick = async () => {
    const { data } = await client.query<TemplateProjectData>({
      query: GET_TABLE_TEMPLATE,
    });

    if (data) {
      const {
        domainEntities,
        calculationParameters,
        domainObjects,
      } = packTableData(tableData, data?.project.template.structure);

      client
        .mutate({
          mutation: CALCULATION_PROJECT,
          variables: {
            projectStructureInput: {
              domainEntities: domainEntities.map(
                ({ __typename, ...entity }) => entity,
              ),
              attributes: calculationParameters.map(
                ({ __typename, ...attribute }) => attribute,
              ),
              domainObjects,
              risks: [
                { code: 'PARENT_MATERIAL', name: 'Мат. порода' },
                { code: 'MIGRATION', name: 'Миграция' },
              ],
            },
          },
        })
        .then((res) => {
          if (res.data.calculateProject.resultId) {
            saveAs(
              `${DOWNLOAD_RESULT_ROUTE}${res.data.calculateProject.resultId}`,
              'result.zip',
            );
          }
          const errors =
            res.data.calculateProject.errors?.filter(
              (error: TableError) => error.tableName,
            ) || [];
          dispatch(tableDuck.actions.updateErrors(errors));
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.error(e));
    }
  };

  return <Button label="Рассчитать" view="ghost" onClick={handleClick} />;
};
