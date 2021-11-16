/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import dreams from '../../api/dreams';
import videos from '../../api/video';
import css from './dream-constructor.module.scss';
import Window from '../window/window';
import DreamType from './dream-type';
import DreamCategory from './dream-category';
import DreamMessage from './dream-message';
import DreamVideo from './dream-video';
import DreamForm from './dream-form';
import DreamFinished from './dream-finished';
import { reducer, initialState } from './reducer';

function DreamConstructor(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const title = () => {
    const titleText = state.step > 4 ? 'Finished' : `Step ${state.step}/4`;
    return (
      <button
        type="button"
        className={classNames(css.title, {
          [css.titleWithPrev]: state.step > 1,
        })}
        onClick={() => dispatch({ type: 'stepDown' })}
      >
        {titleText}
      </button>
    );
  };

  const toggleCategory = (category) => {
    const categories = state.categories.includes(category)
      ? state.categories.filter((item) => item !== category)
      : [...state.categories, category];
    if (categories.length > 5) return;
    dispatch({ type: 'setCategories', payload: categories });
  };

  const uploadVideo = () => {
    if (state.type !== 'video') {
      return Promise.resolve({ url: null });
    }
    return videos.create(state.video)
      .then((response) => {
        videos.upload(response.upload.upload_link, state.video);
        return response;
      })
      .then((response) => response.link);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    uploadVideo()
      .then((response) => {
        const videoLink = response;
        dreams.create({
          categories: state.categories.map((category) => category.id),
          text: state.type === 'text' ? state.text : videoLink,
          name: state.name,
          email: state.email,
          country: state.country,
          type: state.type,
        });
      })
      .then(() => dispatch({ type: 'stepUp' }));
  };

  const onClose = () => {
    props.onClose();
    dispatch({ type: 'reset' });
  };

  return (
    <Window title={title()} open={props.open} onClose={onClose}>
      <form action="#" name="form" onSubmit={onSubmit}>
        {state.step === 1 && (
          <DreamType dispatch={dispatch} />
        )}
        {state.step === 2 && (
          <DreamCategory
            selectedCategories={state.categories}
            onToggleCategory={toggleCategory}
            onClickNextStep={() => dispatch({ type: 'stepUp' })}
          />
        )}
        {state.step === 3 && state.type === 'text' && (
          <DreamMessage
            onClickNextStep={() => dispatch({ type: 'stepUp' })}
            onChangeText={(text) => dispatch({ type: 'setText', payload: text })}
          />
        )}
        {state.step === 3 && state.type === 'video' && (
          <DreamVideo
            dispatch={dispatch}
            open={props.open}
          />
        )}
        {state.step === 4 && (
          <DreamForm dispatch={dispatch} />
        )}
        {state.step === 5 && (
          <DreamFinished
            onClose={props.onClose}
            resetSteps={() => dispatch({ type: 'reset' })}
          />
        )}
      </form>
    </Window>
  );
}

DreamConstructor.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DreamConstructor;
