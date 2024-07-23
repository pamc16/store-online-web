import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';
import { RootState } from "root-reducer";

interface InitialState {
  openModalLogin: boolean;
  accessToken: string;
  user: any;
}

const initialState: InitialState = {
    openModalLogin: false,
    accessToken: '',
    user: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setOpenModalLogin(state: InitialState, action: PayloadAction<boolean>) {
      state.openModalLogin = action.payload;
    },
    setAccessToken(state: InitialState, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setUser(state: InitialState, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
});

export const useLoginSelector = () =>
	useSelector<RootState, InitialState>(
		({ [loginSlice.name]: slice }) => slice,
	);

export const {
  setOpenModalLogin,
  setAccessToken,
  setUser,
} = loginSlice.actions;

export default loginSlice.reducer;
