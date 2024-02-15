import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const pages = [
    {
      name: "Chat",
      url: "/chat",
    },
    {
      name: "About",
      url: "/about",
    },
  ];

  useEffect(() => {}, []);

  const auth = useSelector((state) => state.auth);

  return (
    <Box sx={{ boxShadow: 0, margin: 1 }}>
      <Stack
        direction={"row"}
        spacing={2}
        height={"35px"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <Stack direction={"row"}>
          {pages.map((el, index) => (
            <Button variant="text" key={index} href={el.url} color="primary">
              <Typography>{el.name}</Typography>
            </Button>
          ))}
        </Stack>
        {auth.id ? (
          <AccountMenu />
        ) : (
          <Stack direction={"row"} spacing={1}>
            <Button href="login">Login</Button>
            <Button href="register">Register</Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Navbar;
