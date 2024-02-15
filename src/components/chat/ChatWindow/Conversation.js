import { Box, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { fetchMessages } from "../../../redux/message/messagesSlice";

const Conversation = () => {
  const auth = useSelector((state) => state.auth);
  const messages = useSelector((state) => state.messages.list);
  const dispatch = useDispatch();
  const stackRef = useRef(null);

  const scrollToBottom = () => {
    if (stackRef.current) {
      stackRef.current.scrollTop = stackRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.receiverUser) {
          const data = {
            receiver_id: auth.id,
            sender_id: auth.receiverUser.id,
            count: 0,
          };
          await dispatch(fetchMessages(data));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [auth]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      ref={stackRef}
      sx={{
        height: "100%",
        maxHeight: "100%",
        overflowY: "auto",
        padding: 2,
        bgcolor: "white",
      }}
    >
      {auth.receiverUser &&
        messages
          .filter(
            (el) =>
              el.receiver_id === auth.receiverUser.id ||
              el.sender_id === auth.receiverUser.id
          )
          .map((el, index) => (
            <Message
              key={el.id}
              message={el}
              received={el.receiver_id === auth.receiverUser.id}
            />
          ))}
    </Box>
  );
};

export default Conversation;
