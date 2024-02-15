import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const Message = ({ message, received }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation once the component mounts
    setIsVisible(true);
  }, []);

  const messageContainerStyle = {
    display: "flex",
    flexDirection: received ? "row-reverse" : "row",
    marginBottom: "8px",
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.3s ease-in-out", // Add a fade-in transition
  };

  const textMessageStyle = {
    backgroundColor: received ? "#e0e0e0" : "#d3ffd3",
    padding: "8px",
    borderRadius: "4px",
    overflowWrap: "break-word", // Prevent long words from overflowing
    maxWidth: "800px",
  };

  return (
    <Box style={messageContainerStyle} maxWidth={"100%"}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={received ? "flex-end" : "flex-start"}
        maxWidth={"100%"}
      >
        <Typography variant="body1" style={textMessageStyle}>
          {message.content}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          style={{ marginTop: "4px" }}
        >
          {received && message.created_at}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;
