import { Box, Stack, Typography, Badge } from "@mui/material";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { updateReceiverUser } from "../../../redux/auth/authSlice";

const Header = () => {
  const users = useSelector((state) => state.users);
  const ru = useSelector((state) => state.auth.receiverUser);
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const rid = auth.receiverUser.id;
    const l = users.list;

    // console.log(l);

    const userIndex = l.findIndex((user) => user.id === rid);

    if (userIndex !== -1) {
      dispatch(updateReceiverUser(l[userIndex]));
    } else {
      console.log("User not found in the list");
    }
  }, [users.list, auth.receiverUser.id]);

  return (
    <Box p={2} borderBottom="1px solid #ccc">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            size={48}
            textSizeRatio={2}
            name={ru ? ru.name : "Unknown User"}
          />
          <Stack>
            <Typography variant="subtitle1" fontWeight="bold">
              {ru ? ru.name : "Unknown User"}
            </Typography>
            <Typography
              variant="body2"
              color={!ru ? "black" : ru.online ? "green" : "grey"}
            >
              {ru ? (ru.online ? "Online" : "Offline") : "unknown"}
            </Typography>
          </Stack>
        </Stack>
        {ru?.unreadMessages && (
          <Badge badgeContent={ru.unreadMessages} color="primary">
            <Typography variant="body2" color="primary">
              New Messages
            </Typography>
          </Badge>
        )}
      </Stack>
    </Box>
  );
};

export default Header;
