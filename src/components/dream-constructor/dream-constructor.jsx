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
  const [country, setCountry] = useState('');

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

  function onChangeText(text) {
    setText(text);
    nextStep();
  }

  function onChangeName(name) {
    setName(name);
  }

  function onChangeEmail(email) {
    setEmail(email);
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

  function onChangeCountry(country) {
    setCountry(country);
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
            onClickNextStep={onChangeText}
          />
        )}
        {step === 4 && (
          <DreamForm
            onChangeName={onChangeName}
            onChangeEmail={onChangeEmail}
            onChangeCountry={onChangeCountry}
          />
        )}
      </form>
    </Window>
  );
}