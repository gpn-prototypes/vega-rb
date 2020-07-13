import React from 'react'
import style from './style.module.css'
import { Tabs } from '@gpn-prototypes/vega-ui'
import { Button, ChoiceGroup } from '@gpn-prototypes/vega-ui'
import DistributionChart from './components/DistributionChart'

// const choiceGroupItems = [
//     {
//         name: 'Нефть',
//     },
//     {
//         name: 'Газ',
//     },
// ]
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
                {/*
                <ChoiceGroup
                    items={choiceGroupItems}
                    getItemKey={(item): string => item.name}
                    getItemLabel={(item): string => item.name}
                />
                  */}
            </div>
            <div className={style.Content}>
                <DistributionChart />
            </div>
        </div>
    )
}

export default SchemePage
