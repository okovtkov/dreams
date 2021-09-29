import classNames from 'classnames';
import React, { useState } from 'react';
import css from './header.module.scss';
import Positioner from '../positioner/positioner';
import IconShare from '../svg-icon/icons/icon-share';
import DreamConstructor from '../dream-constructor/dream-constructor';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <Positioner className={css.wrapper}>
      <a href="#a" className={classNames(css.logo, css.link)}>
        Dream for
        <span>EARTH</span>
      </a>
      <div className={css.buttonsWrapper}>
        <a href="#s" className={classNames(css.link, css.about)}>
          <span className={css.about_mobile}>About</span>
          <span className={css.about_desk}>About the initiative</span>
        </a>
        <button type="button" className={css.button} onClick={() => setOpen(true)}>
          Share your dream
          <IconShare />
        </button>
        <DreamConstructor open={open} onClose={() => setOpen(false)} />
      </div>
    </Positioner>
  );
}
