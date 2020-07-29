import React from 'react'
import { Button, Tabs } from '@gpn-prototypes/vega-ui'
import ChartForm from './components/ChartForm'
import style from './style.module.css'

const tabItems = [
    {
        name: 'Пайплайн',
    },
    {
        name: 'Ресурсная база',
    },
    {
        name: 'Геологические риски',
    },
]

const SchemePage: React.FC<{}> = () => {
    return (
        <div className={style.SchemePage}>
            <div className={style.Tabs}>
                <Tabs
                    value={[{ name: 'Ресурсная база' }]}
                    items={tabItems}
                    getItemKey={(item): string => item.name}
                    getItemLabel={(item): any => (
                        <>
                            <span>{item.name}</span>
                        </>
                    )}
                ></Tabs>
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
                <div className={style.LeftPanel}></div>
                <div className={style.RightPanel}>
                    <ChartForm />
                </div>
            </div>
        </div>
    )
}

export default SchemePage
