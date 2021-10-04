import React from 'react';
import PropTypes from 'prop-types';
import css from './text-field.module.scss';

function TextField(props) {
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

TextField.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  onChangeValue: PropTypes.func,
};

export default TextField;
