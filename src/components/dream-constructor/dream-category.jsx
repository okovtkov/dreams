import PropTypes from 'prop-types';
import React from 'react';
import css from './dream-constructor.module.scss';
import Button from '../button/button';
import Title from '../title/title';
import DreamCategories, { categories } from '../dream-categories/dream-categories';
import { actions } from './reducer';

function DreamCategory(props) {
  const validate = () => {
    if (props.state.categories.length === 0) throw new Error('Please, select your 1-5 categories');
  };

  const onClickNextStep = () => {
    try {
      validate();
      props.dispatch(actions.stepUp());
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
        selectedCategories={props.state.categories}
        onToggleCategory={(category) => props.dispatch(actions.toggleCategory(category))}
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

const categoryType = PropTypes.shape({
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number,
  color: PropTypes.string,
});

const stateType = PropTypes.shape({
  categories: PropTypes.arrayOf(categoryType),
  step: PropTypes.number,
  type: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  video: PropTypes.object,
  text: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  country: PropTypes.string,
});

DreamCategory.propTypes = {
  state: stateType,
  dispatch: PropTypes.func.isRequired,
};

export default DreamCategory;
