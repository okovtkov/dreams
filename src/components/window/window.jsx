import classNames from 'classnames';
import React from 'react';
import css from './window.module.scss';

export default function Window(props) {
  return (
    <div
      className={classNames(css.container, {
        [css.container_open]: props.open,
      })}
    >
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
