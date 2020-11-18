import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { useUnmount } from '@gpn-prototypes/vega-hooks';
import ExcelTable from 'components/ExcelTable';
import { SelectedCell, TableEntities } from 'components/ExcelTable/types';
import { ProjectContext } from 'components/Providers';
import {
  Distribution,
  DistributionChart as IDistributionChart,
  DistributionDefinitionErrors,
  DistributionParameter,
  ProjectStructure,
} from 'generated/graphql';
import { GET_DISTRIBUTION_VALUE } from 'pages/Scheme/components/DistributionSettings/queries';
import {
  GET_TABLE_TEMPLATE,
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
    const getDistributionValue = async ({
      type,
      definition,
      parameters,
    }: Distribution) =>
      client
        .query({
          query: GET_DISTRIBUTION_VALUE,
          context: {
            uri: getGraphqlUri(projectId),
          },
          fetchPolicy: 'no-cache',
          variables: {
            distribution: {
              parameters: (parameters as DistributionParameter[]).map(
                ({ __typename, ...parameter }) => parameter,
              ),
              type,
              definition,
            },
          },
        })
        .then((response) => {
          const distributionChart =
            response?.data?.resourceBase.distribution?.distributionChart;
          const errors = (distributionChart as DistributionDefinitionErrors)
            ?.errors;
          if (errors?.length) {
            return null;
          }
          return (distributionChart as IDistributionChart).percentiles?.find(
            (percentile) => percentile.rank === 50,
          )?.point.x as number;
        })
        .catch(({ message }) => {
          return null;
        });
    const getDistributionValues = async (structure: ProjectStructure) => {
      const result = await Promise.all(
        structure.domainObjects.map(({ attributeValues }) => {
          return Promise.all(
            structure.attributes
              .map((_, colIdx) => attributeValues[colIdx])
              .map((distribution) => {
                if (distribution) {
                  return getDistributionValue(distribution);
                }
                return distribution;
              }),
          );
        }),
      );
      return result;
    };
    client
      .query({
        query: GET_VERSION,
        variables: {
          vid: projectId,
        },
        fetchPolicy: 'no-cache',
      })
      .then((versionRes) => {
        client
          .query({
            query: LOAD_PROJECT,
            context: {
              uri: getGraphqlUri(projectId),
            },
            fetchPolicy: 'no-cache',
          })
          .then((res) => {
            if (res.data.resourceBase.project.loadFromDatabase) {
              const {
                structure,
              } = res.data.resourceBase.project.loadFromDatabase.conceptions[0];
              getDistributionValues(
                structure,
              ).then((distributionResultValues) =>
                dispatch(
                  tableDuck.actions.init(
                    unpackTableData(
                      structure,
                      versionRes.data.project.version,
                      distributionResultValues,
                    ),
                  ),
                ),
              );
            } else if (
              res.data.resourceBase.project.loadFromDatabase === null
            ) {
              client
                .query({
                  query: GET_TABLE_TEMPLATE,
                  variables: {
                    vid: projectId,
                  },
                  context: {
                    uri: getGraphqlUri(projectId),
                  },
                  fetchPolicy: 'no-cache',
                })
                .then((templateRes) => {
                  dispatch(
                    tableDuck.actions.init(
                      unpackTableData(
                        templateRes.data.resourceBase.project.template
                          .conceptions[0].structure,
                        versionRes.data.project.version,
                        [],
                      ),
                    ),
                  );
                });
            }
          });
      });
  }, [client, dispatch, projectId]);

  useUnmount(() => {
    dispatch(tableDuck.actions.reset());
  });

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
