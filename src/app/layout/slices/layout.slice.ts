import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../../../root-reducer';
import { type CategoriaItems } from '../../components/menu/menu';
import { useSelector } from 'react-redux';

interface InitialState {
	categorias: CategoriaItems[];
	openModalShoppingCart: boolean;
	subcategorias: any;
	selectedTab: string;
}

const initialState: InitialState = {
	categorias: [],
	openModalShoppingCart: false,
	subcategorias: [],
	selectedTab: 'lading_page',
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
		setSelectedTab(state, action: PayloadAction<string>) {
			state.selectedTab = action.payload;
		},
	},
});

export const {
	decrement,
	increment,
	incrementByAmount,
	setOpenModalShoppingCart,
	setSelectedTab,
} = layoutSlice.actions;

export const useLayoutSelector = () =>
	useSelector<RootState, InitialState>(
		({ [layoutSlice.name]: slice }) => slice,
	);

export const selectCategorias = (state: RootState) => state.layout.categorias;

export default layoutSlice.reducer;
