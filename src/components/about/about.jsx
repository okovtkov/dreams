import React, { useState } from 'react';
import css from './about.module.scss';
import Positioner from '../positioner/positioner';
import Button from '../button/button';
import IconShare from '../svg-icon/icons/icon-share';
import Planet from './planet.png';
import PlanetMob from './planet_mobile.png';
import DreamConstructor from '../dream-constructor/dream-constructor';

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <Positioner className={css.wrapper} id="about">
      <h1 className={css.title}>What does the world dream of?</h1>
      <picture className={css.image}>
        <source srcSet={Planet} media="(min-width: 540px)" className={css.source} />
        <img src={PlanetMob} alt="планета" className={css.img} />
      </picture>
      <p className={css.text}>
        Deploy offline this discussion for product launch the right info at the right time to the
        right people. Cloud strategy killing it we need distributors to evangelize the new line to
        local markets, for exposing new.
      </p>
      <Button className={css.button} onClick={() => setOpen(true)}>
        <span>Share your dream</span>
        <IconShare />
      </Button>
      <DreamConstructor open={open} onClose={() => setOpen(false)} />
    </Positioner>
  );
}
