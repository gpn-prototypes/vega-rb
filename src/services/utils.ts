import { ConceptionInput, RbProjectInput } from 'generated/graphql';

const baseApiUrl = process.env.BASE_API_URL;

export const getGraphqlUri = (projectId: string): string =>
  `${baseApiUrl}/graphql/${projectId}`;

export const getDownloadResultUri = (id: string): string =>
  `${baseApiUrl}/files/calculation_result/${id}`;

export const getMockConceptions = (
  conception: ConceptionInput,
): RbProjectInput => {
  return {
    version: '0.1.0',
    conceptions: [conception],
  };
};
