import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  openModalLogin: boolean;
}

const initialState: InitialState = {
    openModalLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setOpenModalLogin(state, action: PayloadAction<boolean>) {
      state.openModalLogin = action.payload;
    },
  },
});

export const {
  setOpenModalLogin,
} = loginSlice.actions;

export default loginSlice.reducer;
