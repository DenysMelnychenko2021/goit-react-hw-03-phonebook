import { Component } from 'react';

import { Container } from 'test/phonebook/components/container';
import { Section } from 'test/phonebook/components/section';
import { ContactForm } from 'test/phonebook/components/contactForm';
import { Contacts } from 'test/phonebook/components/contacts';
import { Filter } from 'test/phonebook/components/filter';
import { ContactList } from 'test/phonebook/components/contactsList';
import { Modal } from 'test/modal';
import { Clock } from 'test/clock';

import data from 'data/data.json';

export class Phonebook extends Component {
  state = { ...data, filterValue: '', showModal: false };

  componentDidMount() {
    console.log('Mount');

    const contacts = localStorage.getItem('contacts');
    console.log('get localStorage', contacts);
    const parseContacts = JSON.parse(contacts);
    console.log('parse', parseContacts);

    /*  setTimeout(() => {
      this.setState({ contacts: parseContacts });
    }, 5000); */
    //this.setState({ contacts: parseContacts });
    /* if (parseContacts) {
      this.setState({ contacts: parseContacts });
    } */
    parseContacts && this.setState({ contacts: parseContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Update');
    console.log('prevState', prevState.contacts);
    console.log('state', this.state.contacts);

    //this.setState() в render и в update setState вызывать нельзя, будет зацикленность

    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновился масив contacts');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
    setTimeout(() => {
      this.setState({ filterValue: '' });
    }, 500);
  };

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));

  render() {
    console.log('Phonebook render');
    const {
      addContactSubmit,
      getClickDelete,
      handleFilterChange,
      getBlur,
      toggleModal,
    } = this;

    const { contacts, filterValue, showModal } = this.state;

    const visibleContacts = this.getHandlerFilter();

    return (
      <Container title="Phonebook">
        <button type="button" onClick={toggleModal}>
          Открыть модалку
        </button>
        {showModal && (
          <Modal closeModal={toggleModal}>
            <Clock />
            <p>
              Контент модалки: Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Cupiditate sequi fuga assumenda sed quis, culpa
              reprehenderit rem perferendis asperiores sunt blanditiis, amet
              autem saepe laborum, ducimus eligendi nisi beatae esse?
            </p>
            <button type="button" onClick={toggleModal}>
              Закрыть
            </button>
          </Modal>
        )}

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
