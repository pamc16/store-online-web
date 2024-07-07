import { combineReducers } from "@reduxjs/toolkit";
import layoutReducer from "./app/layout/slices/layout.slice";
import loginReducer from "./app/page/login/slice/login.slice";
import storeReducer from "./app/page/store/slice/store.slice";
// Importa tus otros reducers aquí

const rootReducer = combineReducers({
  layout: layoutReducer,
  login: loginReducer,
  store: storeReducer,
  // Agrega otros reducers aquí
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
