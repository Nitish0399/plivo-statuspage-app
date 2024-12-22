import React, { useState } from "react";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { loginUser } from "../../../api/public";
import { updateUser } from "../../../state/slices/User";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      // Make a POST request to the login route
      const response = await loginUser({ email, password });

      if (response.status === 200) {
        dispatch(updateUser(response.data.user));
        // Redirect to the applications page on successful login
        navigate("/home/applications");
      }
    } catch (err) {
      // Handle errors
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          maxWidth: 400,
          margin: "50px auto",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ width: "100%", marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            margin="normal"
            defaultValue="john_doe@plivo.com"
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            defaultValue="Pass@123"
            required
          />
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="success"
        sx={{ alignSelf: "flex-between" }}
        onClick={() => window.open("/status", "_blank")}
      >
        View Status
      </Button>
    </>
  );
};

export default Login;
