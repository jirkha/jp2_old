import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getProductType = createAsyncThunk("productType/getData", () => {
  return axios.get("/api/list_productType/").then((res) => res.data);
});

const productTypeSlice = createSlice({
  name: "productType",
  initialState: {
    data: [],
    //isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductType.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getProductType.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default productTypeSlice;