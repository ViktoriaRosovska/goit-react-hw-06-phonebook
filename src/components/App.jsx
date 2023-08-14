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
// import { useState, useMemo } from 'react';
// import { useLocalStorage } from './hooks/useLocalStorage';

// const CONTACT_KEY = 'contacts';

export function App() {
  // const [contacts, setContacts] = useLocalStorage(CONTACT_KEY, mycontacts);
  // const [filter, setFilter] = useState('');

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
