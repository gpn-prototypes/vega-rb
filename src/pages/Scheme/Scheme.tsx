import React, { useState, ChangeEvent } from 'react'
import { Button } from '@gpn-prototypes/vega-button'
// import { Tabs } from '@gpn-prototypes/vega-tabs'
import ChartForm from './components/ChartForm'
import style from './style.module.css'
import Table from './components/Table'
import { ExportButton } from './components/ExportButton/ExportButton'
import { ImportButton } from './components/ImportButton/ImportButton'

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
    const [showGraph, setShowGraph] = useState<boolean>(true)

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
                <ExportButton />
                <ImportButton />
            </div>
            <div className={style.Content}>
                <div className={style.LeftPanel}>
                    <Table onSelect={setShowGraph} />
                </div>
                <div className={style.RightPanel} hidden={showGraph}>
                    <ChartForm />
                </div>
            </div>
        </div>
    )
}

export default SchemePage
