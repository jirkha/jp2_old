import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getTransaction = createAsyncThunk("transaction/getData", () => {
  return axios.get("/api/list_transaction/").then((res) => res.data);
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    data: [],
    //isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getTransaction.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default transactionSlice;