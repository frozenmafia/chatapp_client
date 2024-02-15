import { Box, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import Conversation from "./Conversation";

const ChatWindow = ({ width, height }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Box
      width={width}
      height={height}
      display="flex"
      flexDirection="column"
      justifyContent={"space-between"}
    >
      <Header />
      <Conversation />
      <Footer />
    </Box>
  );
};
export default ChatWindow;
