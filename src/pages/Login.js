import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getLastActiveTimestamp,
  login,
  setAutoLogout,
  setLastActiveTimestamp,
} from "../redux/auth/authSlice";
import { useWebSocket } from "../redux/websocket/WebSocketProvider";

const Login = () => {
  const [email, setEmail] = React.useState("shivank@example.com");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("123qwe123qwe");
  const [passwordError, setPasswordError] = React.useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { webSocket, initializeWebSocket } = useWebSocket();

  React.useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      navigate("/about");
    }
  }, []);
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (!value.trim()) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (!value.trim()) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    dispatch(
      login({
        email: email,
        password: password,
      })
    ).then((res) => {
      if (!res.error) {
        console.log(webSocket);
        initializeWebSocket();
        setLastActiveTimestamp();
        setAutoLogout(dispatch, 10 * 60 * 1000);

        window.location.reload();
      }

      // navigate("/chat");
    });
  };

  return (
    <Box height={"100%"} justifyContent={"center"} display="flex">
      <Stack alignItems={"center"}>
        <Typography variant="h2" margin={2}>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <Stack spacing={2}>
              <TextField
                label="Email"
                value={email}
                type="email"
                size="small"
                onChange={handleEmailChange}
                error={Boolean(emailError)}
                helperText={emailError}
              />
              <TextField
                label="Password"
                size="small"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
              {auth.error && (
                <Typography color="error">{auth.error}</Typography>
              )}

              <Button type="submit">Login</Button>
            </Stack>
          </FormControl>
        </form>
      </Stack>
    </Box>
  );
};

export default Login;
