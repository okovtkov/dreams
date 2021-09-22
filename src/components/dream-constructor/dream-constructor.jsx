import classNames from 'classnames';
import React, { useState } from 'react';
import css from './dream-constructor.module.scss';
import Window from '../window/window';
import DreamType from './dream-type';
import DreamCategory from './dream-category';
import DreamMessage from './dream-message';
import VideoPlayer from '../video-player/video-player';
import DreamForm from './dream-form';
import DreamFinished from './dream-finished';

export default function DreamConstructor() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [step, setStep] = useState(1);
  const [type, setType] = useState('');
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('USA');
  const [open, setOpen] = useState(true);

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

  const onSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(
      selectedCategories,
      type,
      text,
      name,
      email,
      country,
    );
    nextStep();
  };

  return (
    <Window title={title()} open={open} onClose={() => setOpen(!open)}>
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
            onClickChangeText={setText}
          />
        )}
        {step === 3 && type === 'video' && (
          <VideoPlayer
            onClickNextStep={nextStep}
            onClickChangeText={setText}
          />
        )}
        {step === 4 && (
          <DreamForm
            onChangeName={setName}
            onChangeEmail={setEmail}
            onChangeCountry={setCountry}
          />
        )}
        {step === 5 && <DreamFinished onClose={() => setOpen(!open)} />}
      </form>
    </Window>
  );
}
