import React from 'react';
import PropTypes from 'prop-types';
import css from './title.module.scss';

function Title(props) {
  return (
    <h2 className={css.title}>{props.children}</h2>
  );
}

Title.propTypes = {
  children: PropTypes.string,
};

export default Title;
