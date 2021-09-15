import React, { useState } from 'react';
import css from './dream-constructor.module.scss';
import Title from '../title/title';
import Button from '../button/button';

export default function DreamMessage(props) {
  const [text, setText] = useState('');

  function validate() {
    if (text.length === 0) {
      alert('Please, write your dream');
      return false;
    }
    return true;
  }

  function onClickNextStep() {
    const result = validate();
    if (result) props.onClickNextStep(text);
  }

  function updateMessage(event) {
    const text = event.target.value;
    if (text.length > 140) return;
    setText(text);
  }

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
          value={text}
          onChange={(event) => updateMessage(event)}
        >
        </textarea>
        <div className={css.count}>{text.length}/140</div>
      </div>
      <Button onClick={onClickNextStep}>Next step</Button>
    </>
  );
}