import { gql } from '@apollo/client';

export const GET_CHART_DATA = gql`
  query normalByDeviation($deviationInput: DeviationInput!) {
    distribution {
      normalByDeviation(deviationInput: $deviationInput) {
        __typename
        ... on Distribution {
          curve {
            x
            y
          }
        }
      }
    }
  }
`;
export const GET_NORMAL_BY_MIN_MAX = gql`
  query normalByMinMax($borderConditionsInput: BorderConditionsInput!) {
    distribution {
      normalByMinMax(borderConditionsInput: $borderConditionsInput) {
        __typename
        ... on Distribution {
          curve {
            x
            y
          }
        }
      }
    }
  }
`;
