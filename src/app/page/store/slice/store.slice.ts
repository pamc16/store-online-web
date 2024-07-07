import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    showShoppingCart: boolean;
}

const initialState: InitialState = {
    showShoppingCart: false,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setShowShoppingCart(state, action: PayloadAction<boolean>) {
      state.showShoppingCart = action.payload;
    },
  },
});

export const {
    setShowShoppingCart,
} = storeSlice.actions;

export default storeSlice.reducer;
