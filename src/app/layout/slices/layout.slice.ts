import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../root-reducer";
import { CategoriaItems } from "../../components/menu/menu";

interface InitialState {
  categorias: CategoriaItems[];
  subcategorias: any;
  openModalShoppingCart: boolean;
}

const initialState: InitialState = {
  categorias: [],
  subcategorias: [],
  openModalShoppingCart: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    increment(state) {
      state.categorias = [];
    },
    decrement(state) {
      state.subcategorias = [];
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
  increment,
  decrement,
  incrementByAmount,
  setOpenModalShoppingCart,
} = layoutSlice.actions;

export const selectCategorias = (state: RootState) => state.layout.categorias;

export default layoutSlice.reducer;
