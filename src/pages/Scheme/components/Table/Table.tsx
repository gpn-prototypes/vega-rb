import React from 'react'
import ExcelTable from 'components/ExcelTable'
import { GridCollection } from 'components/ExcelTable/types'

// interface TemplateProjectData {}

// const GET_TABLE_DATA = gql`
//     query GetTemplate {
//         templateProjectData {
//             geoObjectTypes {
//                 name
//             }
//         }
//     }
// `

export default function Table() {
    // const { loading, error, data } = useQuery(GET_TABLE_DATA)
    // const tableData = prepareData(data?.templateProjectData?.geoObjectTypes)

    // if (loading) return <div>Loading</div>
    // if (error) return <div>Error! {error}</div>

    const tableData = { columns: [], rows: [] } as GridCollection

    return <ExcelTable data={tableData} />
}
