import React from 'react';
import css from './select.module.scss';

export default function Select(props) {
  return (
    <div className={css.container}>
      <label className={css.title}>
        {props.title}
        <select
          name={props.name}
          className={css.select}
          onChange={(event) => props.onChangeValue(event.target.value)}
        >
          <option value="USA">USA</option>
          <option value="Russian Federation">Russian Federation</option>
          <option value="Ukraine">Ukraine</option>
          <option value="Uganda">Uganda</option>
          <option value="Canada">Canada</option>
          <option value="China">China</option>
          <option value="Australia">Australia</option>
          <option value="Turkey">Turkey</option>
          <option value="UK">UK</option>
          <option value="Belarus">Belarus</option>
        </select>
      </label>
    </div>
  );
}
