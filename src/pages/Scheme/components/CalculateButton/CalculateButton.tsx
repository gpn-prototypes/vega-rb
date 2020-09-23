import React from 'react';
import { useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { Button } from '@gpn-prototypes/vega-button';
import { RootState } from 'store/types';
import { packData } from 'utils';

import { CALCULATION_PROJECT } from '../../mutations';
import { GET_TABLE_TEMPLATE } from '../Table/queries';
import { TemplateProjectData } from '../Table/Table';

export const CalculateButton: React.FC = () => {
  const client = useApolloClient();
  const tableRows = useSelector(({ table }: RootState) => table);

  const handleClick = async () => {
    const { data } = await client.query<TemplateProjectData>({
      query: GET_TABLE_TEMPLATE,
    });

    if (data) {
      const { domainEntities, calculationParameters, domainObjects } = packData(
        tableRows,
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
            },
          },
        })
        .then((res) => {
          if (res.data.calculateProject.resultId) {
            const a = document.createElement('a');
            a.target = '_blank';
            a.href = `http://vg1-back-5.k8s17.gpn.cloud.nexign.com/calculation_result/${res.data.calculateProject.resultId}`;
            a.download = 'result.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        });
    }
  };

  return <Button label="Рассчитать" view="ghost" onClick={handleClick} />;
};
