import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => (
  <ul className={s.List}>
    {contacts.map(({ id, inputName, inputNumber, gender }) => (
      <li className={s.Item} key={id}>
        <p>Name: {inputName}</p>
        <p>Number: {inputNumber}</p>
        <p>Gender: {gender}</p>
        <button type="button" onClick={() => onDelete(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      inputName: PropTypes.string.isRequired,
      inputNumber: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
    }),
  ),
  onDelete: PropTypes.func.isRequired,
};
