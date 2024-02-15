import { Box, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ChatWindow from "../components/chat/ChatWindow/ChatWindow";
import Sidebar from "../components/chat/Sidebar/Sidebar";

const Chat = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Box height="calc(100vh - 51px)" bgcolor="#f0f0f0">
      <Stack direction="row" height="100%">
        <Sidebar width="20%" height="100%" />
        {auth.receiverUser && <ChatWindow width="80%" height="100%" />}
      </Stack>
    </Box>
  );
};

export default Chat;
