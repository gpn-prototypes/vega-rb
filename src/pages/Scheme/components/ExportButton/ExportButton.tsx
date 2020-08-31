import { packData } from 'utils/tableDataConverters'
import { useSelector } from 'react-redux'
import { RootState } from 'store/reducers'
import { Button } from '@gpn-prototypes/vega-button'
import React from 'react'
import styles from './ExportButton.module.css'
import { useQuery } from '@apollo/client'
import { GET_TABLE_TEMPLATE } from '../Table/queries'
import { TemplateProjectData } from '../Table/Table'

export const ExportButton: React.FC = () => {
    const tableData = useSelector((state: RootState) => state.table)
    const { data } = useQuery<TemplateProjectData>(GET_TABLE_TEMPLATE)
    const onClick = async () => {
        if (data) {
            const fileData = packData(
                tableData,
                data.project.template.structure
            )
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
    }
    return (
        <Button
            label="Экспорт"
            view="ghost"
            onClick={onClick}
            className={styles.ExportButton}
        />
    )
}
