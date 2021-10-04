import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.scss';

function Button(props) {
  const type = props.type || 'button';
  const clickHandler = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={clickHandler}
      disabled={props.disabled}
      className={classNames(props.className, css.button, {
        [css.transparent]: props.transparent,
      })}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
