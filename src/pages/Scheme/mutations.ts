import { gql } from '@apollo/client';

export const CALCULATION_PROJECT = gql`
  mutation calculateProject($projectInput: RBProjectInput!) {
    resourceBase {
      calculateProject(projectInput: $projectInput) {
        ... on TableErrors {
          errors {
            code
            message
            column
            row
            tableName
            columnKey
          }
        }
        ... on CalculationResult {
          resultId
        }
        ... on DistributionDefinitionErrors {
          errors {
            code
            message
            fields
          }
        }
      }
    }
  }
`;
