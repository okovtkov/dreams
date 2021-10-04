import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import css from './positioner.module.scss';

function Positioner(props) {
  return (
    <div className={classNames(props.className, css.positioner)} id={props.id}>
      {props.children}
    </div>
  );
}

Positioner.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Positioner;
