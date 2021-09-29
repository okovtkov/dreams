import classNames from 'classnames';
import React, { useEffect } from 'react';
import css from './window.module.scss';

export default function Window(props) {
  useEffect(() => {
    if (props.open) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [props.open]);

  return (
    <div
      className={classNames(css.container, {
        [css.container_open]: props.open,
      })}
    >
      <section className={css.window}>
        <header className={css.header}>
          <span>{props.title}</span>
          <button aria-label="закрыть" type="button" className={css.close} onClick={props.onClose} />
        </header>
        {props.children}
      </section>
    </div>
  );
}
