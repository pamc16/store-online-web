import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { type RootState } from 'root-reducer';

interface InitialState {
	openModalUploadFile: boolean;
	previewImage: string;
	previewVisible: boolean;
}

const initialState: InitialState = {
	openModalUploadFile: false,
	previewImage: '',
	previewVisible: false,
};

const premiumSlice = createSlice({
	initialState,
	name: 'premium',
	reducers: {
		setOpenModalUploadFile(
			state: InitialState,
			action: PayloadAction<boolean>,
		) {
			state.openModalUploadFile = action.payload;
		},
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

export const { setOpenModalUploadFile, setPreviewImage, setPreviewVisible } =
	premiumSlice.actions;

export default premiumSlice.reducer;
