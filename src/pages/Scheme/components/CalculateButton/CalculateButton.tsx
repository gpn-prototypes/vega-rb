import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { Button } from '@gpn-prototypes/vega-ui';
import { ProjectContext } from 'components/Providers';
import { TableError } from 'generated/graphql';
import { conceptionStructureIsNotEmpty } from 'pages/Scheme/components/DistributionSettings/helpers';
import { TemplateProjectData } from 'pages/Scheme/components/Table/types';
import {
  getDownloadResultUri,
  getGraphqlUri,
  getMockConceptions,
} from 'pages/Scheme/helpers';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { packTableData } from 'utils';

import { CALCULATION_PROJECT } from '../../mutations';
import { GET_TABLE_TEMPLATE } from '../Table/queries';

export const CalculateButton: React.FC = () => {
  const client = useApolloClient();
  const { projectId, identity } = useContext(ProjectContext);
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.table);

  const handleClick = async () => {
    const { data } = await client.query<TemplateProjectData>({
      query: GET_TABLE_TEMPLATE,
      context: {
        uri: getGraphqlUri(projectId),
      },
    });

    if (data) {
      const { domainEntities, attributes, domainObjects = [] } = packTableData(
        tableData,
        data?.resourceBase.project.template.conceptions[0].structure,
      );
      const conception = {
        name: 'conception_1',
        description: 'описание',
        probability: 1,
        structure: {
          domainEntities,
          attributes,
          domainObjects,
          risks: [
            { code: 'PARENT_MATERIAL', name: 'Мат. порода' },
            { code: 'MIGRATION', name: 'Миграция' },
          ],
        },
      };
      if (conceptionStructureIsNotEmpty(conception)) {
        client
          .mutate({
            mutation: CALCULATION_PROJECT,
            context: {
              uri: getGraphqlUri(projectId),
            },
            variables: {
              projectInput: getMockConceptions(conception),
            },
          })
          .then((res) => {
            if (res.data.resourceBase.calculateProject.resultId) {
              fetch(
                getDownloadResultUri(
                  res.data.resourceBase.calculateProject.resultId,
                ),
                {
                  headers: {
                    Authorization: `Bearer ${identity?.getToken()}`,
                  },
                },
              )
                .then((resp) => resp.blob())
                .then((blob) => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.style.display = 'none';
                  a.href = url;
                  a.download = 'result.zip';
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                });
            }
            const errors =
              res.data.resourceBase.calculateProject.errors?.filter(
                (error: TableError) => error.tableName,
              ) || [];
            dispatch(tableDuck.actions.updateErrors(errors));
          })
          // eslint-disable-next-line no-console
          .catch((e) => console.error(e));
      }
    }
  };

  return <Button label="Рассчитать" view="ghost" onClick={handleClick} />;
};
