import React from 'react';
import Window from '../window/window';
import css from './description.module.scss';

export default function Description(props) {
  return (
    <Window title="About" open={props.open} onClose={props.onClose}>
      <h2 className={css.title}>Something about Dream for Earth</h2>
      <p className={css.text}>
        Deploy offline this discussion for product launch the right info at the right time to the
        right people. Cloud strategy killing it we need distributors to evangelize the new line to
        local markets, for exposing new.
      </p>
    </Window>
  );
}
