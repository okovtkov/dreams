import classNames from 'classnames';
import React from 'react';
import css from './positioner.module.scss';

export default function Positioner(props) {
  return (
    <div className={classNames(props.className, css.positioner)} id={props.id}>
      {props.children}
    </div>
  );
}
