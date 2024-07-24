import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { type RootState } from 'root-reducer';

interface InitialState {
	accessToken: string;
	openModalLogin: boolean;
	user: any;
	loadingAuth: boolean;
}

const initialState: InitialState = {
	accessToken: '',
	openModalLogin: false,
	user: {},
	loadingAuth: false,
};

const loginSlice = createSlice({
	initialState,
	name: 'login',
	reducers: {
		setAccessToken(state: InitialState, action: PayloadAction<string>) {
			state.accessToken = action.payload;
		},
		setOpenModalLogin(state: InitialState, action: PayloadAction<boolean>) {
			state.openModalLogin = action.payload;
		},
		setUser(state: InitialState, action: PayloadAction<any>) {
			state.user = action.payload;
		},
		setLoading(state: InitialState, action: PayloadAction<boolean>) {
			state.loadingAuth = action.payload;
		},
	},
});

export const useLoginSelector = () =>
	useSelector<RootState, InitialState>(
		({ [loginSlice.name]: slice }) => slice,
	);

export const { setAccessToken, setOpenModalLogin, setUser, setLoading } =
	loginSlice.actions;

export default loginSlice.reducer;
