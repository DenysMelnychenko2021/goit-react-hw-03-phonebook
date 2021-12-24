import { Component } from 'react';
import { Container } from '../container';
import { Section } from '../section';
import { ContactForm } from '../contactForm';
import { Contacts } from '../contacts';
import { Filter } from '../filter';
import { ContactList } from '../contactList';

export class Phonebook extends Component {
  state = {
    contacts: [
      {
        id: 'id-1',
        inputName: 'Rosie Simpson',
        inputNumber: '459-12-56',
        gender: 'female',
        agreed: true,
      },
      {
        id: 'id-2',
        inputName: 'Hermione Kline',
        inputNumber: '443-89-12',
        gender: 'male',
        agreed: true,
      },
      {
        id: 'id-3',
        inputName: 'Eden Clements',
        inputNumber: '645-17-79',
        gender: 'male',
        agreed: true,
      },
      {
        id: 'id-4',
        inputName: 'Annie Copeland',
        inputNumber: '227-91-26',
        gender: 'female',
        agreed: true,
      },
    ],
    filterValue: '',
  };

  addContactSubmit = newContact => {
    const { contacts } = this.state;
    if (contacts.find(contact => newContact.inputName === contact.inputName))
      alert(`${newContact.inputName} is already in contacts`);
    else if (
      contacts.find(contact => newContact.inputNumber === contact.inputNumber)
    )
      alert(`${newContact.inputNumber} is already in contacts`);
    else
      this.setState(({ contacts }) => ({
        contacts: [{ ...newContact }, ...contacts],
      }));
  };

  getClickDelete = idContact =>
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(contact => contact.id !== idContact),
      };
    });

  handleFilterChange = ({ currentTarget }) => {
    const { value } = currentTarget;
    this.setState({ filterValue: value });
  };

  getHandlerFilter = () => {
    const { contacts, filterValue } = this.state;
    return contacts.filter(contact =>
      contact.inputName.toLowerCase().includes(filterValue.toLowerCase()),
    );
  };
  getBlur = () => {
    this.setState({ filterValue: '' });
  };

  render() {
    const { addContactSubmit, getClickDelete, handleFilterChange, getBlur } =
      this;
    const { contacts, filterValue } = this.state;
    const visibleContacts = this.getHandlerFilter();

    return (
      <Container title="Phonebook">
        <Section>
          <ContactForm onSubmitContact={addContactSubmit} />
        </Section>
        <Section>
          <Contacts title="Contacts">
            {contacts.length > 1 && (
              <Filter
                filterValue={filterValue}
                onFilterChange={handleFilterChange}
                onBlur={getBlur}
              />
            )}
            {contacts.length > 0 ? (
              <ContactList
                contacts={visibleContacts}
                onDelete={getClickDelete}
              />
            ) : (
              'There are no contacts in the phone book. Please add a contact'
            )}
          </Contacts>
        </Section>
      </Container>
    );
  }
}
