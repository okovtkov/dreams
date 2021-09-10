import React from 'react';
import css from './dream-constructor.module.scss';
import Title from '../title/title';
import Button from '../button/button';

export default class DreamMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  validate() {
    if (this.state.text.length === 0) {
      alert('Please, write your dream');
      return false;
    }
    return true;
  }

  onClickNextStep() {
    const result = this.validate();
    if (result) this.props.onClickNextStep(this.state.text);
  }

  updateMessage(event) {
    const text = event.target.value;
    if (text.length > 140) return;
    this.setState({text: text})
  }

  render() {
    return (
      <>
        <Title>Write your dream</Title>
        <p className={css.text}>Write your 140 character dream! For example, start with “I dream of ...”</p>
        <div className={css.wrapper}>
          <textarea
            className={css.textarea}
            name="message"
            cols="40"
            rows="15"
            placeholder="Write your dream here..."
            value={this.props.value}
            onChange={(event) => this.updateMessage(event)}
          >
          </textarea>
          <div className={css.count}>{this.state.text.length}/140</div>
        </div>
        <Button onClick={this.onClickNextStep.bind(this)}>Next step</Button>
      </>
    );
  }
}