import React, { useState } from 'react';
import Window from '../window/window';
import DreamType from './dream-type';
import DreamCategory from './dream-category';
import DreamMessage from './dream-message';
import DreamForm from './dream-form';

export default function DreamConstructor() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [step, setStep] = useState(1);
  const [type, setType] = useState('');
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('USA');

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
  };

  return (
    <Window title={`Step ${step}/4`}>
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
        {step === 3 && (
          <DreamMessage
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
      </form>
    </Window>
  );
}
