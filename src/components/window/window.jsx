import React from 'react';
import css from './window.module.scss';
import Positioner from '../positioner/positioner';

export default class Window extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <section className={css.window}>
          <header className={css.header}>
            <span>{this.props.title}</span>
            <button className={css.close}></button>
          </header>
          {this.props.children}
        </section>
      </div>
    );
  }
}