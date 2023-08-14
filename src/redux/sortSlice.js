import { createSlice } from '@reduxjs/toolkit';
import { sortOrderConst } from 'constants';

const sortSlice = createSlice({
  name: 'sort',
  initialState: sortOrderConst.sortAZ,
  reducers: {
    sortOrder(state, action) {
      return action.payload;
    },
  },
});

export const { sortOrder } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;
