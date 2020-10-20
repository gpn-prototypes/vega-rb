import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Input.module.css';

type IProps = InputHTMLAttributes<unknown>;

export const Input: React.FC<IProps> = ({ className, ...props }) => (
  <input
    // eslint-disable-next-line
    autoFocus
    type="text"
    className={classNames(styles.Root, className)}
    {...props}
  />
);
