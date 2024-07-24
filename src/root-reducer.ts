import { combineReducers } from '@reduxjs/toolkit';
import layoutReducer from './app/layout/slices/layout.slice';
import loginReducer from './app/page/login/slice/login.slice';
import storeReducer from './app/page/store/slice/store.slice';
import premiumReducer from 'app/page/premium/slice/premium.slice';
// importa tus otros reducers aquí

const rootReducer = combineReducers({
	layout: layoutReducer,
	login: loginReducer,
	store: storeReducer,
	premium: premiumReducer,
	// agrega otros reducers aquí
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
