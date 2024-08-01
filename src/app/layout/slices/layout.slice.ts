import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { type RootState } from '../../../root-reducer';
import { type CategoriaItems } from '../../components/menu/menu';

interface InitialState {
	categorias: CategoriaItems[];
	openModalShoppingCart: boolean;
	selectedTab: string;
	subcategorias: any;
}

const initialState: InitialState = {
	categorias: [],
	openModalShoppingCart: false,
	selectedTab: 'lading_page',
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
