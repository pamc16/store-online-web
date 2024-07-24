import { Dispatch, type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../../../root-reducer';
import { type CategoriaItems } from '../../components/menu/menu';

interface InitialState {
	categorias: CategoriaItems[];
	openModalShoppingCart: boolean;
	subcategorias: any;
}

const initialState: InitialState = {
	categorias: [],
	openModalShoppingCart: false,
	subcategorias: [],
};

const layoutSlice = createSlice({
	initialState,
	name: 'layout',
	reducers: {
		decrement(state) {
			state.subcategorias = [];
		},
		increment(state) {
			state.categorias = [];
		},
		incrementByAmount(state, action: PayloadAction<any>) {
			state.categorias = action.payload;
		},
		setOpenModalShoppingCart(state, action: PayloadAction<boolean>) {
			state.openModalShoppingCart = action.payload;
		},
	},
});

export const {
	decrement,
	increment,
	incrementByAmount,
	setOpenModalShoppingCart,
} = layoutSlice.actions;

export const selectCategorias = (state: RootState) => state.layout.categorias;

export default layoutSlice.reducer;
