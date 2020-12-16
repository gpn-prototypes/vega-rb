import { gql } from '@apollo/client';

export const GET_RECENTLY_EDITED = gql`
  query accessData($vid: UUID) {
    project(vid: $vid) {
      ... on Project {
        recentlyEdited
      }
      ... on Error {
        code
        message
      }
    }
  }
`;
