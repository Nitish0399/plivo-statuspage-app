import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";

import Service from "./Service";
import Incident from "./Incident";

import {
  getApplications,
  getAppServices,
  listIncidents,
} from "../../../api/public";
import { io } from "socket.io-client";

const StatusPage = () => {
  const [applications, setApplications] = useState([]);
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await getApplications();
        setApplications(response);
      } catch (err) {
        setError("Failed to fetch applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchServices = async (applicationId) => {
    setServices([]);
    setLoading(true);

    try {
      const response = await getAppServices(applicationId);
      setServices(response);
    } catch (err) {
      setError("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  const fetchIncidents = async (applicationId) => {
    setIncidents([]);
    setLoading(true);

    try {
      const response = await listIncidents(applicationId);
      setIncidents(response);
    } catch (err) {
      setError("Failed to fetch incidents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize the Socket.IO connection
    const socket = io(process.env.REACT_APP_API_URL);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("statusUpdate", (payload) => {
      const { serviceId, status } = payload;
      setServices((prev) =>
        prev.map((ob) => (ob._id === serviceId ? { ...ob, status } : ob))
      );
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    return () => {
      socket.disconnect(); // Cleanup the socket connection when component unmounts
    };
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        bgcolor: "background.default",
      }}
    >
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            marginBottom: 3,
            backgroundColor: "error.light",
            color: "error.contrastText",
          }}
        >
          <Typography variant="body1">{error}</Typography>
        </Paper>
      )}

      <Stack direction="row" spacing={4} alignItems="flex-start">
        {/* Applications Section */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            Applications
          </Typography>
          {applications.length > 0 ? (
            applications.map((app) => (
              <Card key={app._id} sx={{ marginBottom: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5">{app.name}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 2 }}
                  >
                    Status: {app.status || "Unknown"}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      fetchServices(app._id);
                      fetchIncidents(app._id);
                    }}
                  >
                    Show Status
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2">No applications found.</Typography>
          )}
        </Box>

        {/* Services Section */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            Services
          </Typography>
          {services.length > 0 ? (
            services.map((service) => (
              <Service key={service._id} service={service} />
            ))
          ) : (
            <Typography variant="body2">No services found.</Typography>
          )}
        </Box>

        {/* Incidents Section */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            Incidents
          </Typography>
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <Incident
                key={incident._id}
                incident={incident}
                services={services}
              />
            ))
          ) : (
            <Typography variant="body2">No ongoing incidents.</Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default StatusPage;
