import React from 'react';
import css from './title.module.scss';

export default class Title extends React.Component {
  render() {
    return (
      <h2 className={css.title}>{this.props.children}</h2>
    );
  }
}