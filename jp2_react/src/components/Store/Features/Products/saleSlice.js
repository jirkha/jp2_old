import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getSale = createAsyncThunk("sale/getData", () => {
  return axios.get("/api/list_sale/").then((res) => res.data);
});

const saleSlice = createSlice({
    name: "sale",
    initialState: {
        data: [],
        //isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSale.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(getSale.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = "";
        });
        builder.addCase(getSale.rejected, (state, action) => {
          state.loading = false;
          state.data = [];
          state.error = action.error.message;
        });
    },
});

export default saleSlice;