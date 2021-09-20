import React from 'react';
import css from './positioner.module.scss';

export default function About(props) {
  return (
    <div className={css.positioner}>
      {props.children}
    </div>
  );
}
