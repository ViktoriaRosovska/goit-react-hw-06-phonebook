import {
  ContactsListContainer,
  ContactListRender,
  Button,
  SortOptions,
  List,
  Span,
} from './ContactList.styled';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { SvgIcon } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';

import * as services from 'services/notify';

import { sortOrderConst } from 'constants';
import { sortOrder } from 'redux/sortSlice';
import { deleteContact } from 'redux/phonebookSlice';

export function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter.value);
  console.log(filter);
  const filteredContacts =
    filter === ''
      ? contacts
      : contacts.filter(el => el.name.toLowerCase().includes(filter));
  console.log(filteredContacts);
  const order = useSelector(state => state.sort);
  let sortFilteredList;
  if (order === sortOrderConst.sortAZ) {
    sortFilteredList = [...filteredContacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (order === sortOrderConst.sortZA) {
    sortFilteredList = [...filteredContacts].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  const onDeleteContact = user => {
    services.Confirm.show(
      `Delete contact`,
      `Are you sure you want to delete contact ${user.name}?`,
      'Yes',
      'No',
      () => {
        services.Notify.info(`Contact ${user.name} was deleted`);
        dispatch(deleteContact(user.id));
      }
    );
  };

  const onSortContacts = order => {
    console.log(order);
    return dispatch(sortOrder(order));
  };

  return (
    <ContactsListContainer>
      <SortOptions>
        <span>Sort contacts by:</span>
        <Button
          type="button"
          onClick={() => onSortContacts('az')}
          title="sort by A-Z"
          aria-label="sort by A-Z"
        >
          <SvgIcon component={KeyboardArrowDownIcon}></SvgIcon>
        </Button>
        <Button
          type="button"
          onClick={() => onSortContacts('za')}
          title="sort by Z-A"
          aria-label="sort by Z-A"
        >
          <SvgIcon component={KeyboardArrowUpIcon}></SvgIcon>
        </Button>
      </SortOptions>

      <ContactListRender>
        <ul>
          {sortFilteredList &&
            sortFilteredList.map(contact => (
              <List key={contact.id}>
                <Span>{contact.name}</Span> <Span>{contact.number}</Span>
                <Button type="button" onClick={() => onDeleteContact(contact)}>
                  <SvgIcon component={DeleteForeverIcon}></SvgIcon>
                </Button>
              </List>
            ))}
        </ul>
        {!Boolean(contacts.length) && (
          <p>There are no contacts in your phonebook</p>
        )}
        {!Boolean(sortFilteredList.length) && Boolean(contacts.length) && (
          <p>No more contacts found</p>
        )}
      </ContactListRender>
    </ContactsListContainer>
  );
}
