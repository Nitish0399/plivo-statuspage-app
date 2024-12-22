import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

const ServiceStatus = ({ service }) => {
  // Function to determine the Chip color based on the service status
  const getStatusColor = (status) => {
    switch (status) {
      case "Operational":
        return "success"; // Green
      case "Degraded Performance":
        return "warning"; // Yellow
      case "Partial Outage":
        return "info"; // Blue
      case "Major Outage":
        return "error"; // Red
      default:
        return "default"; // Gray for unknown statuses
    }
  };

  return (
    <Card
      sx={{
        marginBottom: 2,
        boxShadow: 3,
        borderRadius: 2,
        padding: 1,
        bgcolor: "background.paper",
      }}
    >
      <CardContent>
        {/* Service Name */}
        <Typography variant="h6" component="div" gutterBottom>
          {service.name || "Unnamed Service"}
        </Typography>

        {/* Status Display */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginRight: 2, fontWeight: "bold" }}
          >
            Status:
          </Typography>
          <Chip
            label={service.status || "Unknown"}
            color={getStatusColor(service.status)}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              fontWeight: "medium",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServiceStatus;
