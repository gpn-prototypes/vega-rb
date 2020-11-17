import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '@gpn-prototypes/vega-ui';

import style from './Projects.module.css';

const ProjectsPage: React.FC = () => {
  const history = useHistory();

  const handleCreateProjectButtonClick = (): void => {
    history.push('/projects/create');
  };

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
  );
};

export default ProjectsPage;
