import { gql } from '@apollo/client';

export const GET_PROJECT_NAME = gql`
  query ProjectName($vid: UUID) {
    project(vid: $vid) {
      __typename
      ... on Project {
        vid
        version
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

export const ResourceBaseTableFragment = gql`
  fragment ResourceBaseTableFragment on RBProject {
        version
        conceptions {
          name
          probability
          description
          structure {
            domainObjects {
              domainObjectPath {
                code
                value
              }
              geoObjectCategory
              risksValues {
                code
                value
              }
              attributeValues {
                distribution {
                  type
                  definition
                  parameters {
                    type
                    value
                  }
                  minBound
                  maxBound
                }
                code
                visibleValue {
                  ... on VisibleValue {
                    value
                  }
                }
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

export const ResourceBaseProjectFragment = gql`
  ${ResourceBaseTableFragment}

  fragment ResourceBaseProjectFragment on ProjectInner {
    vid
    version
    resourceBase {
      project {
        loadFromDatabase {
          ...ResourceBaseTableFragment
        }
      }
    }
  }
`;

export const ResourceBaseDiffFragment = gql`
  ${ResourceBaseProjectFragment}

  fragment ResourceBaseDiffFragment on UpdateProjectInnerDiff {
    remoteProject {
      ... on ProjectInner {
        ...ResourceBaseProjectFragment
      }
    }
  }
`;


export const LOAD_PROJECT = gql`
  query ProjectResourceBase {
    project {
      ...ResourceBaseProjectFragment
    }
  }

  ${ResourceBaseProjectFragment}
`;

export const SAVE_PROJECT = gql`
  mutation SaveProject($projectInput: RBProjectInput!, $version: Int!) {
    project(version: $version) {
      ... on UpdateProjectInnerDiff {
        ...ResourceBaseDiffFragment
      }
      ... on ProjectMutation {
        resourceBase {
          saveProject(projectInput: $projectInput) {
            ... on TableErrors {
              errors {
                code
                message
                tableName
                columnKey
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

  ${ResourceBaseDiffFragment}
`;

export const GET_TABLE_TEMPLATE = gql`
  query GetTemplate {
    project {
      vid
      version
      resourceBase {
        project {
          template {
            ...ResourceBaseTableFragment
          }
        }
      }
    }
  }

  ${ResourceBaseTableFragment}
`;
