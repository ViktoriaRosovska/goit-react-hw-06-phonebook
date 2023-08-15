import { FormWrapper, FormInput, FormButton } from './ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';

import * as services from '../../services/notify';

import { addContact } from 'redux/phonebookSlice';
import { filteredQuery } from 'redux/filterSlice';
import { contactsSelector } from 'redux/selectors';
export function ContactForm() {
  const contacts = useSelector(contactsSelector);
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    const userName = e.currentTarget.elements.name.value.trim();
    const userNumber = e.currentTarget.elements.number.value.trim();

    if (contacts.find(user => user.name === userName)) {
      return services.Notify.warning(`${userName} is already in contacts`);
    }
    if (contacts.find(user => user.number === userNumber)) {
      return services.Notify.warning(
        `This number: ${userNumber} is already in contacts`
      );
    }
    const user = {
      name: userName,
      number: userNumber,
    };

    dispatch(addContact(user));
    dispatch(filteredQuery({ value: '' }));
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FormWrapper>
        <label htmlFor="formName">Name</label>
        <FormInput
          id="formName"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="phone">Number</label>
        <FormInput
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          required
        />
        <FormButton type="submit">Add contact</FormButton>
      </FormWrapper>
    </form>
  );
}
