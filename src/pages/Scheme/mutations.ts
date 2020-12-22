import { gql } from '@apollo/client';

import { ResourceBaseDiffFragment } from './components/Table/queries';

export const CALCULATION_PROJECT = gql`
  mutation calculateProject($version: Int!, $projectInput: RBProjectInput!) {
    project(version: $version) {
      ... on UpdateProjectInnerDiff {
        ...ResourceBaseDiffFragment
      }
      ... on ProjectMutation {
        resourceBase {
          calculateProject(projectInput: $projectInput) {
            ... on TableErrors {
              errors {
                code
                message
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
    }
  }
  ${ResourceBaseDiffFragment}
`;
