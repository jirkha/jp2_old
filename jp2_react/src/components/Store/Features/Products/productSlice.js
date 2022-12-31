import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getProduct = createAsyncThunk("product/getData", () => {
  return axios.get("/api/list_product/").then((res) => res.data);
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        //isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = "";
        });
        builder.addCase(getProduct.rejected, (state, action) => {
          state.loading = false;
          state.data = [];
          state.error = action.error.message;
        });
    },
});

export default productSlice;