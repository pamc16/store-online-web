import { combineReducers } from "@reduxjs/toolkit";
import layoutReducer from "./app/layout/slices/layout.slice";
// Importa tus otros reducers aquí

const rootReducer = combineReducers({
  layout: layoutReducer,
  // Agrega otros reducers aquí
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
