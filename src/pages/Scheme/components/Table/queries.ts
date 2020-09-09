import { gql } from '@apollo/client';

export const GET_TABLE_TEMPLATE = gql`
  query GetTemplate {
    project {
      template {
        structure {
          __typename
          domainEntities {
            name
          }
          attributes {
            code
            name
            shortName
            units
          }
        }
      }
    }
  }
`;
