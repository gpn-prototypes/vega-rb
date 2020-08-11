import React, { useState } from 'react'
import { Button } from '@gpn-prototypes/vega-button'
import { TextField } from '@gpn-prototypes/vega-text-field'
import { useHistory } from 'react-router'
import style from './style.module.css'

const CreateProjectPage: React.FC<{}> = () => {
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
