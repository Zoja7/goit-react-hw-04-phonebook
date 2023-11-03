import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }
  handleAddContact = data => {
    const hasDuplicated = this.state.contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (hasDuplicated) {
      alert(`'${data.name}' is already in contacts!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      ...data,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  handleFilterChange = event => {
    const value = event.target.value;
    this.setState({ filter: value });
  };

  filterContacts = (contacts, filter) => {
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const FilteredContacts = this.filterContacts(contacts, filter);

    return (
      <div className={`${css.container} ${css.sectionWrapper}`}>
        <h1 className={css.phoneBookTitle}>Phonebook</h1>
        <ContactForm
          onAddContact={this.handleAddContact}
          contacts={this.state.contacts}
        />
        <h2 className={css.contactsTitle}>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactsList
          contacts={this.state.contacts}
          hasFiltered={FilteredContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
