import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axsecure from "../../lib/axsecure";
import {
  FETCH_ALL_USERS,
  LOGIN,
  UPDATE_UNREAD_COUNT,
} from "../constants/function";
import { AUTH, USERS } from "../constants/slice";

export const updateReadCount = createAsyncThunk(
  UPDATE_UNREAD_COUNT,
  async (data, { dispatch }) => {
    try {
      const response = await axsecure.post("/messages/update_count", data);
      dispatch(updateUnreadCount(data));
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  FETCH_ALL_USERS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axsecure.get("/users");
      return response.data;
    } catch (error) {
      // throw error;
      return rejectWithValue(error.response.data);
      //   throw error;
    }
  }
);

// export const updateUnreadCount = (userId, count) => ({
//   type: UPDATE_UNREAD_COUNT,
//   payload: { userId, count },
// });

const usersSlice = createSlice({
  name: USERS,
  initialState: {
    loading: false,
    error: null,
    list: [],
  },
  reducers: {
    updateUnreadCount: (state, action) => {
      console.log(action);
      const { receiver_id, sender_id, count } = action.payload;

      const updatedList = state.list.map((user) =>
        user.id === sender_id ? { ...user, unread: count } : user
      );
      return {
        ...state,
        list: updatedList,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(updateReadCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReadCount.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateReadCount.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { updateUnreadCount } = usersSlice.actions;

export default usersSlice.reducer;
