import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import ExcelTable from 'components/ExcelTable'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/reducers'
import tableDuck from 'store/tableDuck'
import { ITemplateStructure } from 'types'
import { unpackData } from 'utils/tableDataConverters'
import { mockTableRows } from 'utils/fakerGenerators'
import { TableEntities } from 'components/ExcelTable/types'

interface TemplateProjectData {
    project: {
        template: {
            structure: ITemplateStructure
        }
    }
}

const GET_TABLE_TEMPLATE = gql`
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

export default function Table({ onSelect }: { onSelect?: any }) {
    const { loading, error, data } = useQuery<TemplateProjectData>(
        GET_TABLE_TEMPLATE
    )
    const reduxTableData = useSelector(({ table }: RootState) => table)
    const dispatch = useDispatch()
    const templateStructure = data?.project.template.structure

    useEffect(() => {
        if (!reduxTableData?.columns.length && templateStructure) {
            const { columns } = unpackData(templateStructure)
            dispatch(tableDuck.actions.updateColumns(columns))
        }

        if (!reduxTableData?.rows.length) {
            dispatch(tableDuck.actions.updateRows(mockTableRows))
        }
    }, [data, dispatch, reduxTableData, templateStructure])

    if (loading) return <div>Loading</div>
    if (error) return <div>Error! {error}</div>

    return (
        <ExcelTable
            data={reduxTableData}
            setColumns={(data) =>
                dispatch(tableDuck.actions.updateColumns(data))
            }
            setRows={(data) => dispatch(tableDuck.actions.updateRows(data))}
            onRowClick={(column) => {
                if (column.type === TableEntities.CALC_PARAM) onSelect(false)
                else onSelect(true)
            }}
        />
    )
}
