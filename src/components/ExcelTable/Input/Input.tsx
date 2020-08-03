import React, { InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './Input.module.css'

interface IProps extends InputHTMLAttributes<any> {}

export const Input = ({ className, ...props }: IProps) => (
    <input
        autoFocus
        type="text"
        className={classNames(styles.Root, className)}
        {...props}
    />
)
