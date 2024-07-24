import { type Action, configureStore } from '@reduxjs/toolkit';
import { type ThunkAction } from 'redux-thunk';
import rootReducer, { type RootState } from './root-reducer';

const store = configureStore({
	reducer: rootReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
