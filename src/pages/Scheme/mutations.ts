import { gql } from '@apollo/client';

import { ResourceBaseFragment } from './components/Table/queries';

export const CALCULATION_PROJECT = gql`
  ${ResourceBaseFragment}
  mutation calculateProject($version: Int!, $projectInput: RBProjectInput!) {
    project(version: $version) {
      ... on UpdateProjectInnerDiff {
        remoteProject {
          ... on ProjectInner {
            resourceBase {
              ...ResourceBaseFragment
            }
          }
        }
        localProject {
          ... on ProjectInner {
            resourceBase {
              ...ResourceBaseFragment
            }
          }
        }
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
`;
