import React from 'react';
import css from './text-field.module.scss';

export default function TextField(props) {
  return (
    <label className={css.container}>
      {props.title}
      <input
        type={props.type}
        className={css.textField}
        name={props.name}
        onChange={(event) => props.onChangeValue(event.target.value)}
        required={props.required}
      />
    </label>
  );
}
