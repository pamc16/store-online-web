import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
	showShoppingCart: boolean;
}

const initialState: InitialState = {
	showShoppingCart: false,
};

const storeSlice = createSlice({
	initialState,
	name: 'store',
	reducers: {
		setShowShoppingCart(state, action: PayloadAction<boolean>) {
			state.showShoppingCart = action.payload;
		},
	},
});

export const { setShowShoppingCart } = storeSlice.actions;

export default storeSlice.reducer;
