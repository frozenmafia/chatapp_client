import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axsecure from "../../lib/axsecure";
import { LOGIN, LOGOUT } from "../constants/function";
import {
  ACCOUNT,
  EMAIL,
  ID,
  LAST_ACTIVE_KEY,
  PASSWORD,
  TOKEN,
  USERNAME,
} from "../constants/localStorage";
import { AUTH } from "../constants/slice";

export const login = createAsyncThunk(
  LOGIN,
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append(USERNAME, email);
      formData.append(PASSWORD, password);

      const response = await axsecure.post("/login", formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLastActiveTimestamp = () => {
  return localStorage.getItem(LAST_ACTIVE_KEY);
};

export const setLastActiveTimestamp = () => {
  localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
};

export const setAutoLogout = (dispatch, timeout) => {
  setTimeout(() => {
    dispatch(logout());
  }, timeout);
};

export const logout = createAsyncThunk(
  LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      const id = window.localStorage.getItem("id");
      const response = await axsecure.get(`/user/logout`);
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USERNAME);
      localStorage.removeItem(EMAIL);
      localStorage.removeItem(ID);
      localStorage.removeItem(LAST_ACTIVE_KEY);
      window.location.reload();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: AUTH,
  initialState: {
    loading: false,
    error: null,
    username: localStorage.getItem(USERNAME) || ACCOUNT,
    email: localStorage.getItem(EMAIL),
    id: localStorage.getItem(ID),
    receiverUser: null,
  },
  reducers: {
    updateReceiverUser: (state, action) => {
      state.receiverUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.username = localStorage.getItem(USERNAME) || ACCOUNT;
        state.email = localStorage.getItem(EMAIL);
        state.id = localStorage.getItem(ID);
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem(TOKEN, action.payload.access_token);
        localStorage.setItem(USERNAME, action.payload.username);
        localStorage.setItem(EMAIL, action.payload.email);
        localStorage.setItem(ID, action.payload.user_id);

        state.loading = false;
        state.username = action.payload.username;
        state.error = false;
        state.email = action.payload.email;
        state.id = action.payload.user_id;
      })
      .addCase(login.rejected, (state, action) => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USERNAME);
        localStorage.removeItem(EMAIL);
        localStorage.removeItem(ID);
        localStorage.removeItem(LAST_ACTIVE_KEY);
        state.username = ACCOUNT;
        console.log(action);
        state.email = null;
        state.id = null;
        state.error = action.payload
          ? action.payload.detail
          : "Error connecting to server";
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.username = localStorage.getItem(USERNAME) || ACCOUNT;
        state.email = localStorage.getItem(EMAIL);
        state.id = localStorage.getItem(ID);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail
          ? action.payload.detail
          : "Error Connecting to the server";
      });
  },
});

export const { updateReceiverUser } = authSlice.actions;

export default authSlice.reducer;
