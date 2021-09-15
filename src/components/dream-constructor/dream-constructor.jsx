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

  function nextStep() {
    setStep(step + 1);
  }

  function onChangeType(type) {
    setType(type);
    nextStep();
  }

  function toggleCategory(category) {
    const categories = selectedCategories.includes(category)
      ? selectedCategories.filter(item => item !== category)
      : [...selectedCategories, category];
    if (categories.length > 5) return;
    setSelectedCategories(categories);
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log(
      selectedCategories,
      type,
      text,
      name,
      email,
      country
    )
  }

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
            onClickChangeText={(text) => setText(text)}
          />
        )}
        {step === 4 && (
          <DreamForm
            onChangeName={(name) => setName(name)}
            onChangeEmail={(email) => setEmail(email)}
            onChangeCountry={(country) => setCountry(country)}
          />
        )}
      </form>
    </Window>
  );
}