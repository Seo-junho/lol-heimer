import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCALSTORAGE_USER_ID } from '../constants';

export const authMapStateToProps = ({
	authInfo: {
		userId,
	}
}: { authInfo: AuthType }, ownProps: {}) => {
  return { userId };
};

export const authMapDispatchToProps = (dispatch: any) => {
	return bindActionCreators({
		setLoginInfo,
	}, dispatch);
};

export interface AuthType {
	userId: string;
}

const userId = localStorage.getItem(LOCALSTORAGE_USER_ID);

const auth = createSlice({
	name: 'auth',
	initialState: {
		userId,
	},
	reducers: {
		setLoginInfo: (state, action: PayloadAction) => {
			const { userId }: any = action.payload;
			localStorage.setItem(LOCALSTORAGE_USER_ID, userId);
			return action.payload;
		}
	}
});

export const {
	setLoginInfo
} = auth.actions;

export default auth.reducer;
