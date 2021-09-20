import React from 'react';
import css from './dream-constructor.module.scss';
import Title from '../title/title';
import IconVideo from '../svg-icon/icons/icon-video';
import IconMessage from '../svg-icon/icons/icon-message';

export default function DreamType(props) {
  return (
    <>
      <Title>Share your dream</Title>
      <p className={css.text}>
        Deploy offline this discussion for product launch the right info at the right time to the
        right people. Cloud strategy killing it we need distributors to evangelize the new line to
        local markets, for exposing new.
      </p>
      <h3>SELECT DREAM TYPE</h3>
      <ul className={css.list}>
        <li className={css.item}>
          <button type="button" className={css.button} onClick={() => props.onChangeType('video')} disabled>
            <IconVideo />
            <span className={css.variant}>
              Record a video dream
            </span>
          </button>
        </li>
        <li className={css.item}>
          <button type="button" className={css.button} onClick={() => props.onChangeType('text')}>
            <IconMessage />
            <span className={css.variant}>
              Write a text dream
            </span>
          </button>
        </li>
      </ul>
    </>
  );
}
