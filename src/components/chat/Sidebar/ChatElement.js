import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { updateReceiverUser } from "../../../redux/auth/authSlice";
import { updateReadCount } from "../../../redux/users/usersSlice";

const ChatElement = ({ user }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleClick = () => {
    // console.log(user);
    dispatch(updateReceiverUser(user));
    dispatch(
      updateReadCount({ receiver_id: auth.id, sender_id: user.id, count: 0 })
    );
  };

  return (
    <Box
      sx={{
        cursor: "pointer",
        position: "relative",
        backgroundColor: "#f0f0f0",
        padding: 2,
        borderRadius: 2,
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
        margin: "8px 0", // Add margin for spacing between chat elements
      }}
      onClick={handleClick}
    >
      {user.unread > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "green",
            borderRadius: "50%",
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "#fff",
          }}
        >
          {user.unread}
        </Box>
      )}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar size={32} textSizeRatio={2} name={user.name} />
          {user.online ? (
            <Typography variant="body2" color="green">
              Online
            </Typography>
          ) : (
            <Typography variant="body2" color="grey">
              Offline
            </Typography>
          )}
        </Stack>

        <Typography variant="body1">{user.name}</Typography>
      </Stack>
    </Box>
  );
};

export default ChatElement;
