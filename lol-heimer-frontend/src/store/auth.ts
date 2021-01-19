import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCALSTORAGE_TOKEN } from '../constants';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

const auth = createSlice({
	name: 'auth',
	initialState: {
		token,
	},
	reducers: {
		login: (state, action: PayloadAction) => {
			return action.payload;
		}
	}
});

export const {
	login
} = auth.actions;

export default auth.reducer;
