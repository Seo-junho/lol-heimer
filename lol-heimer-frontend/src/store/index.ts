import loadingReducer from './loading';
import authReducer from './auth';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

export interface LoadingType {
	isLoading: boolean;
};

const reducers = combineReducers({
	isLoading: loadingReducer,
	token: authReducer,
})

const rootStore = configureStore({ reducer: reducers });

export type AppDispatch = typeof rootStore.dispatch
export default rootStore;
