import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import projectDuck from 'store/projectDuck';

import style from './HomePage.module.css';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectDuck.actions.fetchParams.started('id'));
  }, [dispatch]);

  return (
    <>
      <div className={style.HomePage}>Home Page</div>
    </>
  );
};

export default HomePage;
