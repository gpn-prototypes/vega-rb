import { FileInput } from '@gpn-prototypes/vega-file-input'
import { Button } from '@gpn-prototypes/vega-button'
import { SnackBar } from '@gpn-prototypes/vega-snack-bar'
import { IconAttach, IconProps } from '@gpn-prototypes/vega-icons'
import React, { ChangeEvent, ReactText, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { IProjectStructure } from '../../../../types'
import { VALIDATE_BEFORE_LOAD } from '../../queries'
import { mockTableRows } from '../../../../utils/fakerGenerators'
import { unpackData } from '../../../../utils/tableDataConverters'
import tableDuck from '../../../../store/tableDuck'
import styles from './style.module.css'
import { IconAlert } from '@gpn-prototypes/vega-icons'

interface IValidateBeforeLoadResponse {
    project: {
        validateBeforeLoad: {
            code: string
            message: string
            details: string
        } | null
    }
}

interface ISnackItem {
    key: string | number
    message?: string | number
    status?: 'alert' | 'success' | 'warning' | 'system' | 'normal' | undefined
    autoClose?: boolean | number
    icon?: React.FC<IconProps>
    onClose?: (item: ISnackItem) => void
    onAutoClose?: (item: ISnackItem) => void
}

export const ImportButton: React.FC = () => {
    const client = useApolloClient()
    const dispatch = useDispatch()
    const [snacks, setSnacks] = useState<ISnackItem[]>([] as ISnackItem[])
    const importData = (e: DragEvent | ChangeEvent) => {
        const { value: fileName, files } = e.target as HTMLInputElement
        let file = files?.[0]

        if (file) {
            let reader = new FileReader()

            reader.readAsText(file)

            reader.onload = async function () {
                const {
                    geoObjectCategories,
                    rows,
                    calculationParameters,
                } = JSON.parse(reader.result as string) as IProjectStructure
                const { data } = await client.query<
                    IValidateBeforeLoadResponse
                >({
                    query: VALIDATE_BEFORE_LOAD,
                    variables: {
                        project: {
                            version: '0.1.01',
                            structure: {
                                geoObjectCategories: geoObjectCategories.map(
                                    ({ __typename, ...value }) => value
                                ),
                                rows,
                            },
                        },
                    },
                })
                if (data?.project.validateBeforeLoad === null) {
                    const {
                        columns,
                        rows: gridRows = mockTableRows,
                    } = unpackData({
                        geoObjectCategories,
                        rows,
                        calculationParameters,
                    })
                    dispatch(tableDuck.actions.updateColumns(columns))
                    dispatch(tableDuck.actions.updateRows(gridRows))
                } else if (data) {
                    setSnacks([
                        {
                            key: 'error',
                            message: data.project.validateBeforeLoad.message,
                            icon: IconAlert,
                            status: 'alert',
                            onClose: () => setSnacks([]),
                            onAutoClose: () => setSnacks([]),
                            autoClose: 5,
                        },
                    ])
                }
            }
            reader.onerror = function () {
                console.log(reader.error)
            }
        }
    }
    return (
        <>
            <FileInput
                id="import"
                accept="json"
                onChange={importData}
                className={styles.FileInput}
            >
                {(props) => (
                    <Button
                        {...props}
                        label="Импорт"
                        view="ghost"
                        iconLeft={IconAttach}
                    />
                )}
            </FileInput>
            <SnackBar items={snacks} className={styles.SnackBar} />
        </>
    )
}
