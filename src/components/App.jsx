// import * as services from 'services/notify';

import {
  AddContactWrapper,
  ContactsWrapper,
  Container,
  HeaderApp,
  HeaderContacts,
} from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactsList/ContactList';

export function App() {

  return (
    <Container>
      <AddContactWrapper>
        <HeaderApp>Phonebook</HeaderApp>
        <ContactForm />
      </AddContactWrapper>
      <ContactsWrapper>
        <Filter />
        <HeaderContacts>Contacts</HeaderContacts>
        <ContactList />
      </ContactsWrapper>
    </Container>
  );
}
