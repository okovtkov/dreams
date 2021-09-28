import React from 'react';
import DreamConstructor from '../components/dream-constructor/dream-constructor';
import Header from '../components/header/header';
import About from '../components/about/about';

export default function PageIndex() {
  return (
    <>
      <DreamConstructor />
      <Header />
      <About />
    </>
  );
}
