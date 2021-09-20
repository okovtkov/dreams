import React from 'react';
import css from './window.module.scss';

export default function Window(props) {
  return (
    <div className={css.container}>
      <section className={css.window}>
        <header className={css.header}>
          <span>{props.title}</span>
          <button aria-label="закрыть" type="button" className={css.close} />
        </header>
        {props.children}
      </section>
    </div>
  );
}
