import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { type RootState } from 'root-reducer';

interface InitialState {
	previewVisible: boolean;
	previewImage: string;
}

const initialState: InitialState = {
previewImage:'',
previewVisible:false
};

const premiumSlice = createSlice({
	initialState,
	name: 'premium',
	reducers: {
		setPreviewImage(state: InitialState, action: PayloadAction<string>) {
			state.previewImage = action.payload;
		},
		setPreviewVisible(state: InitialState, action: PayloadAction<boolean>) {
			state.previewVisible = action.payload;
		},
	},
});

export const usePremiumSelector = () =>
	useSelector<RootState, InitialState>(
		({ [premiumSlice.name]: slice }) => slice,
	);

export const { setPreviewImage, setPreviewVisible } =
premiumSlice.actions;

export default premiumSlice.reducer;
