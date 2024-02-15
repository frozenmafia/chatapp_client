import { useTheme } from "@emotion/react";
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../redux/users/usersSlice";
import { logout, userlogout } from "../../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ChatElement from "./ChatElement";

const Sidebar = ({ width, height }) => {
  const theme = useTheme();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [user_id, setUserId] = useState(localStorage.getItem("id"));

  useEffect(() => {
    dispatch(fetchAllUsers()).then((res) => {
      if (res.error) {
        dispatch(logout()).then(window.location.reload());
      }
    });
  }, []);

  return (
    <Box
      sx={{
        width: { width },
        height: { height },
        backgroundColor: theme.palette.background.paper,
        // backgroundColor: "#000",
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Box width={"95%"} marginBottom={2}>
        <TextField label="Search" fullWidth size="small" />
      </Box>

      {/* <Divider sx={{ marginBottom: 2 }} /> */}
      <Box
        sx={{
          maxHeight: "93.5%",
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        {users.list
          .filter((el) => el.id != user_id && el.online)
          .map((el, index) => (
            <ChatElement key={index} user={el} />
          ))}

        <Divider />

        {users.list
          .filter((el) => el.id != user_id && !el.online)
          .map((el, index) => (
            <ChatElement key={index} user={el} />
          ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
