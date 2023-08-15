import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../constants';
import { nanoid } from 'nanoid';

const phonebookSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(user) {
        return {
          payload: {
            name: user.name,
            number: user.number,
            id: nanoid(),
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(user => user.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;
