import { gql } from '@apollo/client'

export const VALIDATE_BEFORE_LOAD = gql`
    query ValidateBeforeLoad($project: ProjectInput!) {
        project {
            validateBeforeLoad(project: $project) {
                code
                message
                details
            }
        }
    }
`
