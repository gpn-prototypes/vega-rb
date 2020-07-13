import React, { useState } from 'react'
import { NavigationList, Button, TextField } from '@gpn-prototypes/vega-ui'
import { useHistory } from 'react-router'
import style from './style.module.css'

const CreateProjectPage: React.FC<{}> = () => {
    const [activeItem, setActiveItem] = useState('1')
    const [inputValue, setValue] = useState<string | null | undefined>(
        undefined
    )
    const history = useHistory()

    const handleChange = ({ value }: { value: string | null }): void => {
        setValue(value)
    }

    const handleCreateProjectButtonClick = () => {
        history.push('/p/1')
    }

    return (
        <div className={style.ProjectsPage}>
            <div className={style.FlexContainer}>
                <div className={style.FlexContainerIn}>
                    <div className={style.NavWrapper}>
                        <NavigationList>
                            <NavigationList.Item
                                active={activeItem === '1'}
                                onClick={(): void => {
                                    setActiveItem('1')
                                }}
                            >
                                Описание проекта
                            </NavigationList.Item>
                        </NavigationList>
                    </div>
                    <div className={style.TextField}>
                        <TextField
                            value={inputValue}
                            size="m"
                            type="text"
                            placeholder="Название проекта"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <Button
                    label="Создать проект"
                    onClick={handleCreateProjectButtonClick}
                />
            </div>
        </div>
    )
}

export default CreateProjectPage
