import React from 'react';
import css from './button.module.scss';

export default function Button(props) {
  const type = props.type || 'button';
  const clickHandler = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button type={type} className={css.button} onClick={clickHandler}>
      {props.children}
    </button>
  );
}