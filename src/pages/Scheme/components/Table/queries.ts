import { gql } from '@apollo/client';

export const GET_TABLE_TEMPLATE = gql`
  query GetTemplate {
    project {
      template {
        structure {
          domainEntities {
            name
          }
          calculationParameters: attributes {
            code
            name
            shortName
            units
          }
          risks {
            code
            name
          }
        }
      }
    }
  }
`;
