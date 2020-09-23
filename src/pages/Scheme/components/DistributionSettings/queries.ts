import { gql } from '@apollo/client';

export const GET_DISTRIBUTION_VALUE = gql`
  query distributionValue($distribution: DistributionInput!) {
    distribution {
      distributionChart(distribution: $distribution) {
        ... on DistributionDefinitionErrors {
          errors {
            code
            message
            fields
          }
        }
        ... on DistributionChart {
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
