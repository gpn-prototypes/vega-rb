import React from 'react'
import { Button } from '@gpn-prototypes/vega-ui'
import { useHistory } from 'react-router'
import style from './style.module.css'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { Project } from 'generated/graphql'

const PROJECT_LIST = gql`
    {
        projects {
            name
        }
    }
`

const ProjectsPage: React.FC<{}> = () => {
    const history = useHistory()
    const { loading, error, data } = useQuery(PROJECT_LIST)

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
            <ul className={style.ProjectList}>
                {data?.projects.map((p: Project, index: number) => (
                    <li key={index}>{p.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectsPage
