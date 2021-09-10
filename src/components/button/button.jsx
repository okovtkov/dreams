import React from 'react';
import css from './button.module.scss';

export default class Button extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const type = this.props.type || 'button';
    return (
      <button type={type} className={css.button} onClick={this.onClick.bind(this)}>
        {this.props.children}
      </button>
    );
  }
}