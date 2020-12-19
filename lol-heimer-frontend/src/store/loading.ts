import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loading = createSlice({
  name: 'loading',
  initialState: true,
  reducers: {
    setLoading: (state, action: PayloadAction) => {
      return action.payload;
    },
  }
})

export const {
  setLoading
} = loading.actions;

export default loading.reducer;
