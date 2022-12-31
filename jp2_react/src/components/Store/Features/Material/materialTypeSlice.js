import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getMaterialType = createAsyncThunk("materialType/getData", () => {
  return axios.get("/api/item_types/").then((res) => res.data);
});

const materialTypeSlice = createSlice({
  name: "materialType",
  initialState: {
    data: [],
    //isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMaterialType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMaterialType.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getMaterialType.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default materialTypeSlice;