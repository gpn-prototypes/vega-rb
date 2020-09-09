import React from 'react';
import { useSelector } from 'react-redux';
import { useApolloClient, useQuery } from '@apollo/client';
import { Button } from '@gpn-prototypes/vega-button';
import { RootState } from 'store/types';

import { packData } from '../../../../utils';
import { CALCULATION_PROJECT } from '../../mutations';
import { GET_TABLE_TEMPLATE } from '../Table/queries';
import { TemplateProjectData } from '../Table/Table';

export const CalculateButton: React.FC = () => {
  const client = useApolloClient();
  const tableRows = useSelector(({ table }: RootState) => table);
  const { data } = useQuery<TemplateProjectData>(GET_TABLE_TEMPLATE);

  const handleClick = () => {
    if (data) {
      const { domainEntities, attributes, domainObjects } = packData(
        tableRows,
        data?.project.template.structure,
      );

      client
        .mutate({
          mutation: CALCULATION_PROJECT,
          variables: {
            projectStructureInput: {
              domainEntities: domainEntities.map(({ __typename, ...entity }) => entity),
              attributes: attributes.map(({ __typename, ...attribute }) => attribute),
              domainObjects,
            },
          },
        })
        .then((res) => {
          if (res.data.calculateProject.resultId) {
            const fileName = `${res.data.calculateProject.resultId}.zip`;
            const a = document.createElement('a');
            a.target = '_blank';
            a.href = `/calculation_result/${fileName}`;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        });
    }
  };

  return <Button label="Рассчитать" view="ghost" onClick={handleClick} />;
};
