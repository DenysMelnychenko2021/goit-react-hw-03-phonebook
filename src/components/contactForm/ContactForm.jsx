import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';

export class ContactForm extends Component {
  static propTypes = { onSubmitContact: PropTypes.func.isRequired };

  state = {
    inputName: '',
    inputNumber: '',
    gender: 'female',
    agreed: false,
  };

  handleChange = e => {
    const { value, name, type, checked } = e.currentTarget;
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitContact({ id: nanoid(), ...this.state });
    this.resetForm();
  };

  resetForm = () =>
    this.setState({
      inputName: '',
      inputNumber: '',
      gender: 'female',
      agreed: false,
    });

  nameInputId = nanoid();
  numberInputId = nanoid();

  render() {
    const { handleSubmit, handleChange, nameInputId, numberInputId } = this;

    const { inputName, inputNumber, gender, agreed } = this.state;

    return (
      <form className={s.Box} onSubmit={handleSubmit}>
        <label htmlFor={nameInputId}>Name</label>
        <input
          className={s.Input}
          id={nameInputId}
          type="text"
          name="inputName"
          value={inputName}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />

        <label htmlFor={numberInputId}>Number</label>
        <input
          className={s.Input}
          id={numberInputId}
          type="tel"
          name="inputNumber"
          value={inputNumber}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={handleChange}
          />
          Female
        </label>
        <label>
          <span>I agree to the processing of data </span>
          <input
            type="checkbox"
            name="agreed"
            checked={agreed}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={!agreed}>
          Add contact
        </button>
      </form>
    );
  }
}
