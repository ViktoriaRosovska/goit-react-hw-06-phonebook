import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../constants';

const phonebookSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },
    deleteContact(state, action) {
      const index = state.findIndex(user => user.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;
