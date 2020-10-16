import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient, useQuery } from '@apollo/client';
import { Button } from '@gpn-prototypes/vega-button';
import { saveAs } from 'file-saver';
import { TableError } from 'generated/graphql';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { packData } from 'utils';

import { CALCULATION_PROJECT } from '../../mutations';
import { GET_TABLE_TEMPLATE } from '../Table/queries';
import { TemplateProjectData } from '../Table/types';

const DOWNLOAD_RESULT_ROUTE = '`files/calculation_result/`';

export const CalculateButton: React.FC = () => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.table);
  const { data } = useQuery<TemplateProjectData>(GET_TABLE_TEMPLATE);
  const handleClick = () => {
    if (data) {
      const { domainEntities, calculationParameters, domainObjects } = packData(
        tableData,
        data?.project.template.structure,
      );

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
