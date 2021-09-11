import React from 'react';
import Window from '../window/window';
import DreamType from './dream-type';
import DreamCategory from './dream-category';
import DreamMessage from './dream-message';
import DreamForm from './dream-form';

export default class DreamConstructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
      step: 1,
      type: '',
      text: '',
      name: '',
      email: '',
      country: '',
    };
  }

  nextStep() {
    this.setState({step: this.state.step + 1});
  }

  onChangeType(type) {
    this.setState({type});
    this.nextStep();
  }

  toggleCategory(category) {
    const selectedCategories = this.state.selectedCategories.includes(category)
      ? this.state.selectedCategories.filter(item => item !== category)
      : [...this.state.selectedCategories, category];
    if (selectedCategories.length > 5) return;
    this.setState({selectedCategories});
  }

  onChangeText(text) {
    this.setState({text});
    this.nextStep();
  }

  onChangeName(name) {
    this.setState({name: name});
  }

  onChangeEmail(email) {
    this.setState({email: email});
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(
      this.state.selectedCategories,
      this.state.text,
      this.state.name,
      this.state.email
    )
  }

  onChangeCountry() {

  }

  render() {
    return (
      <Window title={`Step ${this.state.step}/4`}>
        <form action="#" name="form" onSubmit={this.onSubmit.bind(this)}>
          {this.state.step === 1 && (
            <DreamType onChangeType={this.onChangeType.bind(this)} />
          )}
          {this.state.step === 2 && (
            <DreamCategory
              selectedCategories={this.state.selectedCategories}
              onToggleCategory={this.toggleCategory.bind(this)}
              onClickNextStep={this.nextStep.bind(this)}
            />
          )}
          {this.state.step === 3 && (
            <DreamMessage
              onClickNextStep={this.onChangeText.bind(this)}
            />
          )}
          {this.state.step === 4 && (
            <DreamForm
              onChangeName={this.onChangeName.bind(this)}
              onChangeEmail={this.onChangeEmail.bind(this)}
              onChangeCountry={this.onChangeCountry.bind(this)}
            />
          )}
        </form>
      </Window>
    );
  }
}