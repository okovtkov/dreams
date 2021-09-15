import React from 'react';
import css from './dream-constructor.module.scss';
import Button from '../button/button';
import Title from '../title/title';
import DreamCategories from '../dream-categories/dream-categories';

export default function DreamCategory(props) {

  function validate() {
    if (props.selectedCategories.length === 0) {
      alert('Please, select your 1-5 categories');
      return false;
    }
    return true;
  }

  function onClickNextStep() {
    const result = validate();
    if (result) props.onClickNextStep();
  }

  return (
    <>
      <Title>What is your dream about?</Title>
      <p className={css.text}>
        Deploy offline this discussion for product launch the right info at the right time to the.
      </p>
      <h3>SELECT YOUR 1-5 CATEGORIES</h3>
      <DreamCategories
        selectedCategories={props.selectedCategories}
        onToggleCategory={props.onToggleCategory}
      />
      <Button onClick={onClickNextStep} >
        Next step
      </Button>
    </>
  );
}