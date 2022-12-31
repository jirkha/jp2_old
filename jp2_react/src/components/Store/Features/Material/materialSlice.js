import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getMaterial = createAsyncThunk(
    "material/getData", () => {
        return axios
        .get("/api/list_items/")
        .then((res) => res.data)
    }
)

const materialSlice = createSlice({
    name: "material",
    initialState: {
        data: [],
        //isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMaterial.pending, state => {
            state.loading = true
        });
        builder.addCase(getMaterial.fulfilled, (state, action) => {
          state.loading = false
          state.data = action.payload
          state.error = ""
        });
        builder.addCase(getMaterial.rejected, (state, action) => {
          state.loading = false
          state.data = []
          state.error = action.error.message
        });
    },
});

export default materialSlice;