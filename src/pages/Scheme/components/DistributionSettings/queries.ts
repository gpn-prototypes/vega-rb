import { gql } from '@apollo/client';

export const GET_DISTRIBUTION_VALUE = gql`
  query distributionValue($distribution: DistributionInput!) {
    distribution {
      distributionValue(distribution: $distribution) {
        __typename
        ... on DistributionDefinitionErrors {
          errors {
            code
            message
            fields
          }
        }
        ... on DistributionValue {
          pdf {
            x
            y
          }
          sf {
            x
            y
          }
          percentiles {
            rank
            point {
              x
              y
            }
          }
        }
      }
    }
  }
`;
