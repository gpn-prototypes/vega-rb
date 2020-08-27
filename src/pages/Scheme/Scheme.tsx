import React, { ChangeEvent, ChangeEventHandler } from 'react'
import { Button } from '@gpn-prototypes/vega-button'
// import { Tabs } from '@gpn-prototypes/vega-tabs'
import { FileInput } from '@gpn-prototypes/vega-file-input'
import { IconAttach } from '@gpn-prototypes/vega-icons'
import ChartForm from './components/ChartForm'
import style from './style.module.css'
import Table from './components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/reducers'
import { packData, unpackData } from '../../utils/tableDataConverters'
import tableDuck from '../../store/tableDuck'
import { mockTableRows } from '../../utils/fakerGenerators'
import { useApolloClient, useQuery } from '@apollo/client'
import { TemplateProjectData } from './components/Table/Table'
import { GET_TABLE_TEMPLATE } from './components/Table/queries'
import { GeoCategory, ITemplateStructure } from '../../types'
import { VALIDATE_BEFORE_LOAD } from './queries'

// const tabItems = [
//     {
//         name: 'Пайплайн',
//     },
//     {
//         name: 'Ресурсная база',
//     },
//     {
//         name: 'Геологические риски',
//     },
// ]
interface ValidateBeforeLoadResponse {
    project: {
        validateBeforeLoad: {
            code: string
            message: string
            details: string
        } | null
    }
}

const SchemePage: React.FC<{}> = () => {
    const tableData = useSelector((state: RootState) => state.table)
    const client = useApolloClient()
    const dispatch = useDispatch()
    const importData = (e: DragEvent | ChangeEvent) => {
        const { value: fileName, files } = e.target as HTMLInputElement
        let file = files?.[0]

        if (file) {
            let reader = new FileReader()

            reader.readAsText(file)

            reader.onload = async function () {
                const { geoObjectCategories, rows } = JSON.parse(
                    reader.result as string
                ) as ITemplateStructure
                const { data } = await client.query<ValidateBeforeLoadResponse>(
                    {
                        query: VALIDATE_BEFORE_LOAD,
                        variables: {
                            project: {
                                version: '0.1.0',
                                structure: {
                                    geoObjectCategories: geoObjectCategories.map(
                                        ({ __typename, ...value }) => value
                                    ),
                                    rows,
                                },
                            },
                        },
                    }
                )
                const { data: structure } = await client.query<
                    TemplateProjectData
                >({
                    query: GET_TABLE_TEMPLATE,
                })

                if (
                    data?.project.validateBeforeLoad === null &&
                    structure?.project.template.structure.calculationParameters
                ) {
                    const {
                        columns,
                        rows: gridRows = mockTableRows,
                    } = unpackData({
                        geoObjectCategories,
                        rows,
                        calculationParameters:
                            structure.project.template.structure
                                .calculationParameters,
                    })
                    dispatch(tableDuck.actions.updateColumns(columns))
                    dispatch(tableDuck.actions.updateRows(gridRows))
                }
            }

            reader.onerror = function () {
                console.log(reader.error)
            }
        }
    }

    const exportData = async () => {
        const fileData = packData(tableData)
        let filename = 'export.json'
        let contentType = 'application/json;charset=utf-8;'
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            const blob = new Blob(
                [decodeURIComponent(encodeURI(JSON.stringify(fileData)))],
                { type: contentType }
            )
            navigator.msSaveOrOpenBlob(blob, filename)
        } else {
            const a = document.createElement('a')
            a.download = filename
            a.href =
                'data:' +
                contentType +
                ',' +
                encodeURIComponent(JSON.stringify(fileData))
            a.target = '_blank'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }
    }

    return (
        <div className={style.SchemePage}>
            <div className={style.Tabs}>
                {/* <Tabs */}
                {/*     value={{ name: 'Ресурсная база' }} */}
                {/*     onChange={noop} */}
                {/*     items={tabItems} */}

                {/*     getLabel={(item): any => ( */}
                {/*         <> */}
                {/*             <span>{item.name}</span> */}
                {/*         </> */}
                {/*     )} */}
                {/* ></Tabs> */}
            </div>
            <div className={style.Header}>
                <Button
                    label="Структура проекта"
                    view="ghost"
                    className={style.ButtonStructure}
                />
                <Button
                    label="Данные"
                    view="ghost"
                    className={style.ButtonData}
                />
                <Button
                    label="Экспорт"
                    view="ghost"
                    className={style.ButtonData}
                    onClick={exportData}
                />
                <FileInput id="import" accept="json" onChange={importData}>
                    {(props) => (
                        <Button
                            {...props}
                            label="Импорт"
                            view="ghost"
                            className={style.ButtonData}
                            iconLeft={IconAttach}
                        />
                    )}
                </FileInput>
            </div>
            <div className={style.Content}>
                <div className={style.LeftPanel}>
                    <Table />
                </div>
                <div className={style.RightPanel}>
                    <ChartForm />
                </div>
            </div>
        </div>
    )
}

export default SchemePage
