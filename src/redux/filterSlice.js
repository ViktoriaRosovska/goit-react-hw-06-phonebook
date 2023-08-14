import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: '' },
  reducers: {
    filteredQuery(state, action) {
      return action.payload;
    },
  },
});

export const { filteredQuery } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
