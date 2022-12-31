import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getStorage = createAsyncThunk(
    "storage/getData", () => {
        return axios.get("/api/list_storage/").then((res) => res.data);
    }
)

export const loading = ((state) => state.storage.loading);

const storageSlice = createSlice({
  name: "storage",
  initialState: {
    data: [],
    //isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStorage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStorage.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getStorage.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default storageSlice;