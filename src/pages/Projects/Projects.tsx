import React from 'react'
import { Button } from '@gpn-prototypes/vega-button'
import { useHistory } from 'react-router'
import style from './style.module.css'

const ProjectsPage: React.FC<{}> = () => {
    const history = useHistory()

    const handleCreateProjectButtonClick = () => {
        history.push('/projects/create')
    }

    return (
        <div className={style.ProjectsPage}>
            <p className={style.Headtext}>Проекты</p>
            <div className={style.FlexContainer}>
                <Button
                    label="Создать новый проект"
                    onClick={handleCreateProjectButtonClick}
                />
            </div>
        </div>
    )
}

export default ProjectsPage
