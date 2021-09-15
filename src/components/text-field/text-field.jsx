import React from 'react';
import css from './text-field.module.scss';

export default function TextField(props) {
  return (
    <div className={css.container}>
      <label>{props.title}</label>
      <input
        type={props.type}
        className={css.textField}
        name={props.name}
        onChange={(event) => props.onChangeValue(event.target.value)}
        required 
      />
    </div>
  );
}