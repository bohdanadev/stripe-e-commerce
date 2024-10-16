import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../interfaces/product.interface';
import { getProductsList } from '../../firebase/utils/product';

interface IState {
  products: IProduct[];
}

const initialState: IState = {
  products: [],
};

const getAll = createAsyncThunk<IProduct[], void>(
  'productsSlice/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProductsList();
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.products = action.payload;
    }),
});

const { reducer: productsReducer, actions } = productsSlice;

const productsActions = {
  ...actions,
  getAll,
};

export { productsActions, productsReducer };
