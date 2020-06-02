import React, { useState } from 'react'
import { Button, ChoiceGroup } from '@gpn-prototypes/vega-ui'
import { useHistory } from 'react-router'
import style from './style.module.css'

type Item = {
    name: string
}

const items = [
    {
        name: 'Все',
    },
    {
        name: 'Избранное',
    },
] as Item[]

const ProjectsPage: React.FC<{}> = () => {
    const [selectValue, setValue] = useState<Item[] | null>(null)
    const history = useHistory()

    const handleCreateProjectButtonClick = () => {
        history.push('/projects/create')
    }

    return (
        <div className={style.ProjectsPage}>
            <p className={style.Headtext}>Проекты</p>
            <div className={style.FlexContainer}>
                <div>
                    <ChoiceGroup<Item>
                        items={items}
                        value={selectValue}
                        getItemKey={(item): string => item.name}
                        getItemLabel={(item): string => item.name}
                        onChange={({ value }): void => setValue(value)}
                        name="ChoiceGroup"
                    />
                </div>
                <Button
                    label="Создать новый проект"
                    onClick={handleCreateProjectButtonClick}
                />
            </div>
            <ul className={style.ProjectList}>
                <li>Project 1</li>
                <li>Project 2</li>
                <li>Project 3</li>
                <li>Project 4</li>
            </ul>
        </div>
    )
}

export default ProjectsPage
