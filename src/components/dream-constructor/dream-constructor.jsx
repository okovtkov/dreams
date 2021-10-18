/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

function DreamConstructor(props) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [step, setStep] = useState(1);
  const [type, setType] = useState('');
  const [video, setVideo] = useState(null);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('USA');
  const [preview, setPreview] = useState(null);

  const title = () => {
    const titleText = step > 4 ? 'Finished' : `Step ${step}/4`;
    return (
      <button
        type="button"
        className={classNames(css.title, {
          [css.titleWithPrev]: step > 1,
        })}
        onClick={() => setStep(Math.max(step - 1, 1))}
      >
        {titleText}
      </button>
    );
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const onRecordVideo = (options) => {
    setVideo(options.video);
    setPreview(options.preview);
    nextStep();
  };

  const onChangeType = (newType) => {
    setType(newType);
    nextStep();
  };

  const toggleCategory = (category) => {
    const categories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    if (categories.length > 5) return;
    setSelectedCategories(categories);
  };

  const resetSteps = () => {
    setStep(1);
    setSelectedCategories([]);
    setText('');
    setVideo(null);
    setName('');
    setEmail('');
    setCountry('USA');
  };

  const uploadVideo = () => {
    if (type !== 'video') return Promise.resolve();
    let url, html;
    return videos.create(video)
      .then((response) => {
        url = response.link;
        html = response.embed.html;
        return videos.upload(response.upload.upload_link, video);
      })
      .then(() => ({
        html,
        url,
      }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    uploadVideo()
      .then((response) => {
        const { html } = response;
        const videoLink = response.url;
        dreams.create({
          categories: selectedCategories.map((category) => category.id),
          text: type === 'text' ? text : videoLink,
          preview,
          html,
          name,
          email,
          country,
          type,
        });
      })
      .then(nextStep);
  };

  return (
    <Window title={title()} open={props.open} onClose={props.onClose}>
      <form action="#" name="form" onSubmit={onSubmit}>
        {step === 1 && (
          <DreamType onChangeType={onChangeType} />
        )}
        {step === 2 && (
          <DreamCategory
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            onClickNextStep={nextStep}
          />
        )}
        {step === 3 && type === 'text' && (
          <DreamMessage
            onClickNextStep={nextStep}
            onChangeText={setText}
          />
        )}
        {step === 3 && type === 'video' && (
          <DreamVideo
            onClickNextStep={onRecordVideo}
          />
        )}
        {step === 4 && (
          <DreamForm
            onChangeName={setName}
            onChangeEmail={setEmail}
            onChangeCountry={setCountry}
          />
        )}
        {step === 5 && <DreamFinished onClose={props.onClose} resetSteps={resetSteps} />}
      </form>
    </Window>
  );
}

DreamConstructor.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DreamConstructor;
