import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REGISTER } from "../constants/function";
import axsecure from "../../lib/axsecure";
import { USER, USERS } from "../constants/slice";

export const register = createAsyncThunk(
  REGISTER,
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axsecure.post("/user/register", userCredentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: USER,
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
