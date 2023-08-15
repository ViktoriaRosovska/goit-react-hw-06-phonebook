import {
  FormInput,
  FindLabel,
  FindWrapper,
} from 'components/ContactForm/ContactForm.styled';

import { useSelector, useDispatch } from 'react-redux';
import { filteredQuery } from 'redux/filterSlice';
import { filterSelector } from 'redux/selectors';

export function Filter() {
  const dispatch = useDispatch();
  const filterQuery = useSelector(filterSelector);

  const onFilterContact = e => {
    const filter = e.target.value.toLowerCase().trim();
    dispatch(filteredQuery({ value: filter }));
  };
  return (
    <FindWrapper>
      <FindLabel htmlFor="filter">Find contact</FindLabel>
      <FormInput
        className="findContact"
        type="text"
        name="filter"
        value={filterQuery}
        title="Find phonebook contact"
        onChange={onFilterContact}
      />
    </FindWrapper>
  );
}
