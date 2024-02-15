import { ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";
import router from "./utils/router";
import theme from "./utils/theme";
import { getLastActiveTimestamp, setAutoLogout } from "./redux/auth/authSlice";
import { useDispatch } from "react-redux";

function App() {
  // const id = useState(window.localStorage.getItem("id"));
  const lastActiveTimestamp = getLastActiveTimestamp();
  const dispatch = useDispatch();

  if (lastActiveTimestamp) {
    const elapsedTime = Date.now() - parseInt(lastActiveTimestamp, 10);
    const remainingTime = 10 * 60 * 1000 - elapsedTime;

    if (remainingTime > 0) {
      setAutoLogout(dispatch, remainingTime); // Set the remaining time as the new timeout
    }
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Navbar />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
