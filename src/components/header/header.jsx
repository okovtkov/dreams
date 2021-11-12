import classNames from 'classnames';
import React, { useState } from 'react';
import css from './header.module.scss';
import Positioner from '../positioner/positioner';
import IconShare from '../svg-icon/icons/icon-share';
import DreamConstructor from '../dream-constructor/dream-constructor';
import Description from '../description/description';

export default function Header() {
  const [openConstructor, setOpenConstructor] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);

  return (
    <Positioner className={css.wrapper}>
      <a href="#a" className={classNames(css.logo, css.link)}>
        Dream for
        <span>EARTH</span>
      </a>
      <div className={css.buttonsWrapper}>
        <button type="button" className={css.about} onClick={() => setOpenDescription(true)}>
          <span className={css.about_mobile}>About</span>
          <span className={css.about_desk}>About the initiative</span>
        </button>
        <button type="button" className={css.button} onClick={() => setOpenConstructor(true)}>
          Share your dream
          <IconShare />
        </button>
        <DreamConstructor open={openConstructor} onClose={() => setOpenConstructor(false)} />
        <Description open={openDescription} onClose={() => setOpenDescription(false)} />
      </div>
    </Positioner>
  );
}
