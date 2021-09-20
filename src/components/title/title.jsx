import React from 'react';
import css from './title.module.scss';

export default function Title(props) {
  return (
    <h2 className={css.title}>{props.children}</h2>
  );
}
