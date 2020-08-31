import React, { useEffect } from 'react'
import style from './HomePage.module.css'
import { useDispatch } from 'react-redux'
import projectDuck from 'store/projectDuck'

const HomePage: React.FC<{}> = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(projectDuck.actions.fetchParams.started('id'))
    }, [dispatch])

    return (
        <>
            <div className={style.HomePage}>Home Page</div>
        </>
    )
}

export default HomePage
