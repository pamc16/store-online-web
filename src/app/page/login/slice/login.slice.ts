import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { type RootState } from 'root-reducer';

interface InitialState {
	accessToken: string;
	loadingAuth: boolean;
	openModalLogin: boolean;
	user: any;
}

const initialState: InitialState = {
	accessToken: '',
	loadingAuth: false,
	openModalLogin: false,
	user: {},
};

const loginSlice = createSlice({
	initialState,
	name: 'login',
	reducers: {
		setAccessToken(state: InitialState, action: PayloadAction<string>) {
			state.accessToken = action.payload;
		},
		setLoading(state: InitialState, action: PayloadAction<boolean>) {
			state.loadingAuth = action.payload;
		},
		setOpenModalLogin(state: InitialState, action: PayloadAction<boolean>) {
			state.openModalLogin = action.payload;
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

export const { setAccessToken, setLoading, setOpenModalLogin, setUser } =
	loginSlice.actions;

export default loginSlice.reducer;
