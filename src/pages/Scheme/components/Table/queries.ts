import { gql } from '@apollo/client'

export const GET_TABLE_TEMPLATE = gql`
    query GetTemplate {
        project {
            template {
                structure {
                    geoObjectCategories {
                        name
                    }
                    calculationParameters {
                        code
                        name
                        shortName
                        units
                    }
                }
            }
        }
    }
`
