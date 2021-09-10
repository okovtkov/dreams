import React from 'react';
import css from './text-field.module.scss';

export default class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.name]: '',
    };
  }

  render() {
    return (
      <div className={css.container}>
        <label>{this.props.title}</label>
        <input
          type={this.props.type}
          className={css.textField}
          name={this.props.name}
          onChange={(event) => this.props.onChangeValue(event.target.value)}
          required 
        />
      </div>
    );
  }
}