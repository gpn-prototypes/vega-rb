import React from 'react'
import { Button } from '@gpn-prototypes/vega-button'
// import { Tabs } from '@gpn-prototypes/vega-tabs'
import ChartForm from './components/ChartForm'
import style from './style.module.css'
import Table from './components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/reducers'
import { packData, unpackData } from '../../utils/tableDataConverters'
import tableDuck from '../../store/tableDuck'
import { mockTableRows } from '../../utils/fakerGenerators'
import { TemplateStructure } from '../../types'

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

const SchemePage: React.FC<{}> = () => {
    const tableData = useSelector((state: RootState) => state.table)
    const dispatch = useDispatch()

    // const importData = () => {
    //     const data: TemplateStructure = { geoObjectCategories: [] }
    //     const { columns, rows = mockTableRows } = unpackData(data)
    //     if (columns.length) {
    //         dispatch(tableDuck.actions.updateColumns(columns))
    //     }
    //     if (rows.length) {
    //         dispatch(tableDuck.actions.updateRows(rows))
    //     }
    // }

    const exportData = () => {
        const data = packData(tableData)
        let filename = 'export.json'
        let contentType = 'application/json;charset=utf-8;'
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            const blob = new Blob(
                [decodeURIComponent(encodeURI(JSON.stringify(data)))],
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
                encodeURIComponent(JSON.stringify(data))
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
                {/*<Button*/}
                {/*    label="Импорт"*/}
                {/*    view="ghost"*/}
                {/*    className={style.ButtonData}*/}
                {/*    onClick={importData}*/}
                {/*/>*/}
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
