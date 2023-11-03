import React, { Component } from 'react';
import css from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      number: this.state.number,
    };

    // if (
    //   !(
    //     data.name === data.name.toLowerCase() ||
    //     data.name === data.name.toUpperCase()
    //   )
    // ) {
    //   alert("Напишіть ім'я, або великими, або малими літерами!");
    //   return;
    // }

    if (data.name.trim() !== '' && data.number.trim() !== '') {
      this.props.onAddContact(data);

      this.setState({ name: '', number: '' });
    }
  };

  handelNameChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <form className={css.formContainer} onSubmit={this.handleSubmit}>
          <label className={css.inputWrapper}>
            <p>Name</p>
            <input
              type="text"
              name="name"
              required
              pattern="[a-zA-Zа-яА-ЯіІїЇґҐєЄ']+"
              value={this.state.name}
              onChange={this.handelNameChange}
            />
          </label>
          <label className={css.inputWrapper}>
            <p>Number</p>
            <input
              type="tel"
              name="number"
              required
              pattern="^\+?\d{1,4}[ .\-]?\(?\d{1,3}\)?[ .\-]?\d{1,4}[ .\-]?\d{1,4}[ .\-]?\d{1,9}$"
              title="Format: XXX-XXX-XX-XX"
              value={this.state.number}
              onChange={this.handelNameChange}
            />
          </label>
          <button className={css.submitButton} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}
