import classNames from 'classnames';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './dream-constructor.module.scss';
import Title from '../title/title';
import TextField from '../text-field/text-field';
import Button from '../button/button';
import Select from '../select/select';
import { actions } from './reducer';

function DreamForm(props) {
  const [agree, setAgree] = useState(false);

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
        required
        onChangeValue={(name) => props.dispatch(actions.setName(name))}
      />
      <TextField
        title="Your Email (not displayed)"
        type="email"
        name="email"
        required
        onChangeValue={(email) => props.dispatch(actions.setEmail(email))}
      />
      <Select
        title="Country"
        name="country"
        required
        onChangeValue={(country) => props.dispatch(actions.setCountry(country))}
      />
      <label className={css.privacyPolicy}>
        <div
          className={classNames(css.checkbox, {
            [css.checkbox_checked]: agree,
          })}
        />
        <p className={css.text}>
          I have read and approve the
          {' '}
          <span>Terms and Conditions</span>
          {' and '}
          <span>Privacy policy</span>
        </p>
        <input type="checkbox" required onChange={() => setAgree(!agree)} />
      </label>
      <Button type="submit">
        Send dream
      </Button>
    </>
  );
}

DreamForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default DreamForm;
