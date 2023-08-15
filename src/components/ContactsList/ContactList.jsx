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
import {
  contactsSelector,
  filterSelector,
  sortSelector,
} from 'redux/selectors';

export function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector(contactsSelector);
  const filter = useSelector(filterSelector);
  const order = useSelector(sortSelector);

  const filterFunc =
    filter === '' ? _ => true : el => el.name.toLowerCase().includes(filter);

  const sortFunc =
    order === sortOrderConst.sortAZ
      ? (a, b) => a.name.localeCompare(b.name)
      : (a, b) => b.name.localeCompare(a.name);

  const filtered = contacts.filter(filterFunc).sort(sortFunc);

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
    return dispatch(sortOrder(order));
  };

  return (
    <ContactsListContainer>
      <SortOptions>
        <span>Sort contacts by:</span>
        <Button
          type="button"
          onClick={() => onSortContacts(sortOrderConst.sortAZ)}
          title="sort by A-Z"
          aria-label="sort by A-Z"
        >
          <SvgIcon component={KeyboardArrowDownIcon}></SvgIcon>
        </Button>
        <Button
          type="button"
          onClick={() => onSortContacts(sortOrderConst.sortZA)}
          title="sort by Z-A"
          aria-label="sort by Z-A"
        >
          <SvgIcon component={KeyboardArrowUpIcon}></SvgIcon>
        </Button>
      </SortOptions>

      <ContactListRender>
        <ul>
          {filtered.map(contact => (
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
        {!Boolean(filtered.length) && Boolean(contacts.length) && (
          <p>No more contacts found</p>
        )}
      </ContactListRender>
    </ContactsListContainer>
  );
}
