import React from 'react';
import css from './dream-constructor.module.scss';
import Title from '../title/title';
import TextField from '../text-field/text-field';
import Button from '../button/button';
import classNames from 'classnames';
import Select from '../select/select';

export default class DreamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agree: false,
    }
  }

  toggleAgreement() {
    this.setState({agree: !this.state.agree});
  }

  render() {
    return (
      <>
        <Title>Some info about yourself</Title>
        <p className={css.text}>
          Nisl, nisi, risus ut iaculis. Tristique porttitor dui, et, vitae eget ut tristique. 
          Massa luctus nunc non velit nisi.
        </p>
        <TextField
          title="Your full name"
          type="text"
          name="name"
          onChangeValue={this.props.onChangeName}
        />
        <TextField
          title="Your Email (not displayed)"
          type="email"
          name="email"
          onChangeValue={this.props.onChangeEmail}
        />
        <Select title="Country" name="country" onChangeValue={this.props.onChangeCountry} />
        <label className={css.privacyPolicy}>
          <div
            className={classNames(css.checkbox, {
              [css.checkbox_checked]: this.state.agree
            })}
          />
          <p className={css.text}>
            I have read and approve the <span>Terms and Conditions</span> and <span>Privacy policy</span>
          </p>
          <input type="checkbox" required onChange={this.toggleAgreement.bind(this)} />
        </label>
        <Button type="submit">
          Send dream
        </Button>
      </>
    );
  }
}