import React from 'react'
import { Button } from '@gpn-prototypes/vega-button'
// import { Tabs } from '@gpn-prototypes/vega-tabs'
import ChartForm from './components/ChartForm'
import style from './style.module.css'
import Table from './components/Table'

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
