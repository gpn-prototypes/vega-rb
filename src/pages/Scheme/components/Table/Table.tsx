import React from 'react'
import { gql, useQuery } from '@apollo/client'
import ExcelTable from 'components/ExcelTable'
import { prepareData } from './prepareData'

interface TemplateProjectData {}

const GET_TABLE_DATA = gql`
    query GetTemplate {
        templateProjectData {
            geoObjectTypes {
                name
            }
        }
    }
`

export default function Table() {
    const { loading, error, data } = useQuery(GET_TABLE_DATA)
    const tableData = prepareData(data?.templateProjectData?.geoObjectTypes)

    if (loading) return <div>Loading</div>
    if (error) return <div>Error! {error}</div>

    return <ExcelTable data={tableData} />
}
