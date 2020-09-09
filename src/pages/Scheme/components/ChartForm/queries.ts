import { gql } from '@apollo/client';

export const GET_NORMAL_BY_DEVIATION = gql`
  query normalByDeviation($distribution: DistributionInput!) {
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
export const GET_NORMAL_BY_MIN_MAX = gql`
  query normalByMinMax($distribution: DistributionInput!) {
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
