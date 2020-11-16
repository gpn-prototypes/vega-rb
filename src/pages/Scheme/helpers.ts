import { Conception, RbProjectInput } from 'generated/graphql';

export const getGraphqlUri = (projectId: string): string =>
  `${process.env.BASE_API_URL}/graphql/${projectId}`;

export const getDownloadResultUri = (id: string): string =>
  `${process.env.BASE_API_URL}/files/calculation_result/${id}`;

export const getMockConceptions = (conception: Conception): RbProjectInput => {
  return {
    version: '0.1.0',
    conceptions: [conception],
  };
};
