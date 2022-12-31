import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getSaleType = createAsyncThunk("saleType/getData", () => {
  return axios.get("/api/list_saleType/").then((res) => res.data);
});

const saleTypeSlice = createSlice({
  name: "saleType",
  initialState: {
    data: [],
    //isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSaleType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSaleType.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getSaleType.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default saleTypeSlice;