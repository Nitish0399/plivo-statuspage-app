import React from "react";

import { Outlet } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectUser } from "../state/slices/User";

import { logoutUser } from "../api/public";

const AuthLayout = () => {
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    await logoutUser();
    window.history.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "info.light",
          color: "primary.contrastText",
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Plivo StatusPage App</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1">Welcome, {user.fullName}</Typography>
          <Button
            type="button"
            variant="outlined"
            color="light"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Box>

      {/* Outlet for Routes */}
      <Box
        sx={{
          flex: 1,
          padding: 3,
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "info.main",
          color: "primary.contrastText",
          padding: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Plivo StatusPage App
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthLayout;
