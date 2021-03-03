import { gql } from '@apollo/client';

export const GET_PROJECT_NAME = gql`
  query($vid: UUID) {
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
  query($vid: UUID) {
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

export const LOAD_PROJECT = gql`
  {
    resourceBase {
      project {
        loadFromDatabase {
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

export const SAVE_PROJECT = gql`
  mutation SaveProject($projectInput: RBProjectInput!, $version: Int!) {
    resourceBase {
      saveProject(projectInput: $projectInput, version: $version) {
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
`;

export const GET_TABLE_TEMPLATE = gql`
  query GetTemplate {
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
`;
