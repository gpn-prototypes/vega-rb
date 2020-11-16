import { Conception, RbProjectInput } from 'generated/graphql';

const baseApi = process.env.BASE_API_URL;

export const getGraphqlUri = (projectId: string): string =>
  `${baseApi}/graphql/${projectId}`;

export const getDownloadResultUri = (id: string): string =>
  `${baseApi}/files/calculation_result/${id}`;

export const getMockConceptions = (conception: Conception): RbProjectInput => {
  return {
    version: '0.1.0',
    conceptions: [conception],
  };
};
