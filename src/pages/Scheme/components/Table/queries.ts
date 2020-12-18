import { gql } from '@apollo/client';

export const GET_PROJECT_NAME = gql`
  query ProjectName($vid: UUID) {
    project(vid: $vid) {
      __typename
      ... on Project {
        vid
        name
      }
      ... on Error {
        code
      }
    }
  }
`;

export const GET_VERSION = gql`
  query ProjectVersion($vid: UUID) {
    project(vid: $vid) {
      __typename
      ... on Project {
        vid
        version
      }
      ... on Error {
        code
      }
    }
  }
`;

export const ResourceBaseFragment = gql`
  fragment ResourceBaseFragment on ResourceBaseQueries {
    project {
      loadFromDatabase {
        version
        conceptions {
          name
          probability
          description
          structure {
            domainObjects {
              domainObjectPath
              geoObjectCategory
              risksValues
              attributeValues {
                distribution {
                  type
                  definition
                  parameters {
                    type
                    value
                  }
                }
                visibleValue
              }
              domainEntities {
                name
                code
                icon
                visible {
                  calc
                  table
                  tree
                }
              }
              risks {
                code
                name
              }
              attributes {
                code
                name
                shortName
                units
              }
            }
          }
        }
      }
    }
  }
`;

export const LOAD_PROJECT = gql`
  ${ResourceBaseFragment}
  query ProjectResourceBase {
    project {
      resourceBase {
        ...ResourceBaseFragment
      }
    }
  }
`;

export const SAVE_PROJECT = gql`
  ${ResourceBaseFragment}

  mutation SaveProject($projectInput: RBProjectInput!, $version: Int!) {
    project(version: $version) {
      ... on UpdateProjectInnerDiff {
        localProject {
          vid
          version
          resourceBase {
            ...ResourceBaseFragment
          }
        }
        remoteProject {
          vid
          version
          resourceBase {
            ...ResourceBaseFragment
          }
        }
      }
      ... on ProjectMutation {
        resourceBase {
          saveProject(projectInput: $projectInput, version: $version) {
            ... on TableErrors {
              errors {
                code
                message
                tableName
                column
                row
              }
            }
            ... on DistributionDefinitionErrors {
              errors {
                code
                message
                fields
              }
            }
            ... on Error {
              code
              details
              payload
            }
          }
        }
      }
    }
  }
`;

export const GET_TABLE_TEMPLATE = gql`
  query GetTemplate {
    project {
      vid
      version
      resourceBase {
        project {
          template {
            version
            conceptions {
              name
              description
              probability
              structure {
                domainEntities {
                  name
                  code
                  visible {
                    calc
                    tree
                    table
                  }
                  __typename
                }
                attributes {
                  __typename
                  code
                  name
                  shortName
                  units
                }
                risks {
                  __typename
                  code
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
