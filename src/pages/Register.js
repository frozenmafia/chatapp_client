import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      navigate("/about");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const dispatch = useDispatch();

  const checkPasswordMatch = () => {
    const isPasswordsMatch = formData.password1 === formData.password2;

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      password2: isPasswordsMatch ? "" : "Passwords do not match",
    }));
  };

  useEffect(() => {
    // Check if password1 and password2 match
    checkPasswordMatch();
  }, [formData.password1, formData.password2]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, [field]: value }));

    if (!value.trim()) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `${field} is required`,
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if any field is empty
    const isEmptyField = Object.values(formData).some((value) => !value.trim());

    if (isEmptyField) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
        email: "Email is required",
        password1: "Password is required",
        password2: "Password is required",
      }));

      console.log("Form submission prevented due to empty fields");
      return;
    }

    // Check password match one more time before submitting
    checkPasswordMatch();

    // Check if there are any validation errors
    const hasErrors = Object.values(formErrors).some((error) => Boolean(error));

    if (hasErrors) {
      console.log("Form submission prevented due to validation errors");
    } else {
      // Perform registration logic here
      const data = {
        email: formData.email,
        password: formData.password1,
        name: formData.name,
      };
      dispatch(register(data)).then((response) => {
        if (!response.error) {
          navigate("/login");
        }
      });
      console.log("Registration form submitted:", formData);
    }
  };

  return (
    <Box height="100%" justifyContent="center" display="flex">
      <Stack alignItems="center">
        <Typography variant="h2" margin={2}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Stack spacing={2}>
              <TextField
                label="Name"
                value={formData.name}
                type="text"
                size="small"
                onChange={handleChange("name")}
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
              />
              <TextField
                label="Email"
                value={formData.email}
                type="email"
                size="small"
                onChange={handleChange("email")}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
              />
              <TextField
                label="Password"
                size="small"
                type="password"
                value={formData.password1}
                onChange={handleChange("password1")}
                error={Boolean(formErrors.password1)}
                helperText={formErrors.password1}
              />
              <TextField
                label="Confirm Password"
                size="small"
                type="password"
                value={formData.password2}
                onChange={handleChange("password2")}
                error={Boolean(formErrors.password2)}
                helperText={formErrors.password2}
              />
              {user.error && (
                <Typography color="error" variant="body1">
                  {user.error.detail}
                </Typography>
              )}
              <Button type="submit">Register</Button>
            </Stack>
          </FormControl>
        </form>
      </Stack>
    </Box>
  );
};

export default Register;
