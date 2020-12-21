import { gql } from '@apollo/client';

export const GET_DISTRIBUTION_VALUE = gql`
  query distributionValue($distribution: DistributionInput!) {
    resourceBase {
      distribution {
        distributionChart(distribution: $distribution) {
          ... on DistributionChart {
            visiblePercentile {
              rank
              point {
                x
                y
              }
            }
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
            visiblePercentile {
              rank
              point {
                x
                y
              }
            }
          }
          ... on DiscreteDistributionChart {
            visiblePercentile {
              rank
              point {
                x
                y
              }
            }
            pmf {
              x
              y
            }
          }
          ... on DistributionDefinitionErrors {
            errors {
              code
              message
              fields
            }
          }
          ... on CommonErrors {
            errors {
              code
              message
            }
          }
        }
      }
    }
  }
`;
