import classNames from 'classnames';
import React from 'react';
import css from './positioner.module.scss';

export default function About(props) {
  return (
    <div className={classNames(props.className, css.positioner)}>
      {props.children}
    </div>
  );
}
