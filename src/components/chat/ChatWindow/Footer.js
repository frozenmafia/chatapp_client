import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useWebSocket } from "../../../redux/websocket/WebSocketProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  saveMessage,
} from "../../../redux/message/messagesSlice";

const Footer = () => {
  const [message, setMessage] = useState("");
  const { webSocket, _a, _b } = useWebSocket();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const sendMessage = () => {
    // console.log("Sending message initiated.");
    setMessage("");

    const trimmedMessage = message.trim();

    if (trimmedMessage != "") {
      // console.log("done");
      // console.log(message);
      // console.log(webSocket);
      const toSend = message + `:${auth.receiverUser.id}`;
      if (webSocket) webSocket.send(toSend);
      else window.location.reload();
    }
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      // width="100%"
      display="flex"
      justifyContent="space-between"
      p={2}
      bgcolor="#f0f0f0"
    >
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        spacing={2}
      >
        <TextField
          label="Your Message"
          variant="outlined"
          fullWidth
          onChange={handleMessage}
          onKeyDownCapture={handleKeyPress}
          value={message}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default Footer;
