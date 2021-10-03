import React from 'react';
import css from './dream-constructor.module.scss';
import Button from '../button/button';
import Title from '../title/title';
import DreamCategories, { categories } from '../dream-categories/dream-categories';

export default function DreamCategory(props) {
  const validate = () => {
    if (props.selectedCategories.length === 0) throw new Error('Please, select your 1-5 categories');
  };

  const onClickNextStep = () => {
    try {
      validate();
      props.onClickNextStep();
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
  };

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
        mode="large"
        canSelect
        categories={categories}
      />
      <Button onClick={onClickNextStep}>
        Next step
      </Button>
    </>
  );
}
