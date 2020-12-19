import loadingReducer from './loading';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

export interface LoadingType {
	isLoading: boolean;
};

const reducers = combineReducers({
  isLoading: loadingReducer,
})

const rootStore = configureStore({ reducer: reducers });

export type AppDispatch = typeof rootStore.dispatch
export default rootStore;
