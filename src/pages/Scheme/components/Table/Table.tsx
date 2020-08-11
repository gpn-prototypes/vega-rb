import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import ExcelTable from 'components/ExcelTable'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/reducers'
import tableDuck from 'store/tableDuck'
import { TemplateStructure } from 'types'
import { unpackData } from 'utils/tableDataConverters'
import { mockTableRows } from 'utils/fakerGenerators'

interface TemplateProjectData {
    projectStructure: {
        template: TemplateStructure
    }
}

const GET_TABLE_TEMPLATE = gql`
    query GetTemplate {
        projectStructure {
            template {
                geoObjectCategories {
                    name
                }
            }
        }
    }
`

export default function Table() {
    const { loading, error, data } = useQuery<TemplateProjectData>(
        GET_TABLE_TEMPLATE
    )
    const reduxTableData = useSelector((state: RootState) => state.table)
    const dispatch = useDispatch()

    useEffect(() => {
        if (
            !reduxTableData?.columns.length &&
            data?.projectStructure.template.geoObjectCategories
        ) {
            const { columns } = unpackData(
                data?.projectStructure.template || { geoObjectCategories: [] }
            )
            dispatch(tableDuck.actions.updateColumns(columns))
        }
        if (!reduxTableData?.rows.length) {
            dispatch(tableDuck.actions.updateRows(mockTableRows))
        }
    }, [data, dispatch, reduxTableData])

    if (loading) return <div>Loading</div>
    if (error) return <div>Error! {error}</div>

    return (
        <ExcelTable
            data={reduxTableData}
            setColumns={(data) =>
                dispatch(tableDuck.actions.updateColumns(data))
            }
            setRows={(data) => dispatch(tableDuck.actions.updateRows(data))}
        />
    )
}
