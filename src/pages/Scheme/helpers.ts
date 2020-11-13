import { Conception, RbProjectInput } from 'generated/graphql';

export const getGraphqlUri = (projectId: string): string =>
  `http://localhost:8080/graphql/${projectId}`;

export const getDownloadResultUri = (id: string): string =>
  `http://localhost:8080/files/calculation_result/${id}`;

export const getMockConceptions = (conception: Conception): RbProjectInput => {
  return {
    version: '0.1.0',
    conceptions: [conception],
  };
};
