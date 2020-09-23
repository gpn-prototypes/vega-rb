import { gql } from '@apollo/client';

export const CALCULATION_PROJECT = gql`
  mutation calculateProject($projectStructureInput: ProjectStructureInput!) {
    calculateProject(projectStructureInput: $projectStructureInput) {
      ... on TableErrors {
        errors {
          code
          message
          column
          row
        }
      }
      ... on CalculationOk {
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
`;
