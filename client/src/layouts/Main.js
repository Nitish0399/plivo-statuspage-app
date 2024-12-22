import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Layout = () => {
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
        }}
      >
        <Typography variant="h5" align="center">
          Plivo StatusPage App
        </Typography>
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

export default Layout;
