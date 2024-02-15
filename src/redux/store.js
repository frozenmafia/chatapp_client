import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import usersReducer from "./users/usersSlice";
import messagesReducer from "./message/messagesSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    user: userReducer,
    messages: messagesReducer,
  },
});

export default store;
