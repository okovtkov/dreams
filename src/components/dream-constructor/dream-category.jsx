import React from 'react';
import css from './dream-constructor.module.scss';
import Button from '../button/button';
import Title from '../title/title';
import DreamCategories from '../dream-categories/dream-categories';

export default class DreamCategory extends React.Component {
  validate() {
    if (this.props.selectedCategories.length === 0) {
      alert('Please, select your 1-5 categories');
      return false;
    }
    return true;
  }

  onClickNextStep() {
    const result = this.validate();
    if (result) this.props.onClickNextStep();
  }

  render() {
    return (
      <>
        <Title>What is your dream about?</Title>
        <p className={css.text}>
          Deploy offline this discussion for product launch the right info at the right time to the.
        </p>
        <h3>SELECT YOUR 1-5 CATEGORIES</h3>
        <DreamCategories
          selectedCategories={this.props.selectedCategories}
          onToggleCategory={this.props.onToggleCategory}
        />
        <Button onClick={this.onClickNextStep.bind(this)} >
          Next step
        </Button>
      </>
    );
  }
}