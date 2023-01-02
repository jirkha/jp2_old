import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getRemoval = createAsyncThunk(
    "removal/getData", () => {
        return axios.get("/api/list_removal/").then((res) => res.data);
    }
)

const removalSlice = createSlice({
    name: "removal",
    initialState: {
        data: [],
        //isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRemoval.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(getRemoval.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = "";
        });
        builder.addCase(getRemoval.rejected, (state, action) => {
          state.loading = false;
          state.data = [];
          state.error = action.error.message;
        });
    },
});

export default removalSlice;