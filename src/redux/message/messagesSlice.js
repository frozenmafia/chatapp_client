import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axsecure from "../../lib/axsecure";
import { FETCH_MESSAGES, SAVE_MESSAGE } from "../constants/function";
import { MESSAGES } from "../constants/slice";

export const fetchMessages = createAsyncThunk(FETCH_MESSAGES, async () => {
  const response = await axsecure.get("/messages/fetch_all");
  return response.data;
});

export const saveMessage = createAsyncThunk(SAVE_MESSAGE, async (message) => {
  const response = await axsecure.post("/messages/save_message", message);
  return response.data;
});

const initialState = {
  loading: false,
  list: [],
  error: null,
};

const messagesSlice = createSlice({
  name: MESSAGES,
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(saveMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(saveMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default messagesSlice.reducer;
