import classNames from 'classnames';
import React, { useState } from 'react';
import css from './window.module.scss';

export default function Window(props) {
  const [open, setOpen] = useState(props.open);

  return (
    <div
      className={classNames(css.container, {
        [css.container_open]: open,
      })}
    >
      <section className={css.window}>
        <header className={css.header}>
          <span>{props.title}</span>
          <button aria-label="закрыть" type="button" className={css.close} onClick={() => setOpen(false)} />
        </header>
        {props.children}
      </section>
    </div>
  );
}
