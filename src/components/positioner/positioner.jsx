import React from 'react';
import css from './positioner.module.scss';

export default class About extends React.Component {
  render() {
    return (
      <div className={css.positioner}>
        {this.props.children}
      </div>
    );
  }
}