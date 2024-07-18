import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  openModalLogin: boolean;
  accessToken: string;
}

const initialState: InitialState = {
    openModalLogin: false,
    accessToken: '',
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setOpenModalLogin(state, action: PayloadAction<boolean>) {
      state.openModalLogin = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const {
  setOpenModalLogin,
  setAccessToken,
} = loginSlice.actions;

export default loginSlice.reducer;
