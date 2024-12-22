import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Construction, Delete, Info } from "@mui/icons-material";

import {
  getAppServices,
  deleteService,
  updateService,
} from "../../../api/internal";

const Services = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch application services on mount
    const fetchData = async () => {
      setLoading(true);
      try {
        const serviceData = await getAppServices(id);
        setServices(serviceData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteService = async (serviceId) => {
    try {
      await deleteService(serviceId); // Call the deleteService function to delete the service
      setServices(services.filter((service) => service._id !== serviceId)); // Remove the service from the list
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleStatusChange = async (service, newStatus) => {
    setLoading(true);
    try {
      service.status = newStatus;
      await updateService(service._id, service); // API call to update the service status
      setServices((prevServices) =>
        prevServices.map((ob) =>
          ob._id === service._id ? { ...ob, status: newStatus } : ob
        )
      );
    } catch (error) {
      console.error("Error updating service status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Application Details
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Manage the services and view incidents related to this application.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
        <Button
          variant="outlined"
          component={Link}
          to={`/home/applications/${id}/incidents`}
          startIcon={<Info />}
        >
          View Incidents
        </Button>
        <Button
          variant="contained"
          component={Link}
          to={`/home/applications/${id}/add-service`}
        >
          Add Service
        </Button>
      </Stack>

      <Typography variant="h5" gutterBottom>
        Services
      </Typography>

      <List sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <CircularProgress />
          </Box>
        ) : services.length > 0 ? (
          services.map((service) => (
            <React.Fragment key={service._id}>
              <ListItem alignItems="between" sx={{ py: 2 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <Construction />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {service.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      Status:{" "}
                      <Chip
                        label={service.status}
                        color={
                          service.status === "Operational"
                            ? "success"
                            : service.status === "Degraded Performance"
                            ? "warning"
                            : "error"
                        }
                        size="small"
                      />
                    </Typography>
                  }
                />
                <FormControl
                  sx={{ minWidth: 150, marginRight: 2 }}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={service.status}
                    onChange={(e) =>
                      handleStatusChange(service, e.target.value)
                    }
                    label="Status"
                  >
                    <MenuItem value="Operational">Operational</MenuItem>
                    <MenuItem value="Degraded Performance">
                      Degraded Performance
                    </MenuItem>
                    <MenuItem value="Partial Outage">Partial Outage</MenuItem>
                    <MenuItem value="Major Outage">Major Outage</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteService(service._id)}
                  sx={{ alignSelf: "center" }}
                >
                  Delete
                </Button>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "center", py: 3 }}
          >
            No services found for this application.
          </Typography>
        )}
      </List>

      <Button
        type="button"
        variant="outlined"
        sx={{ marginTop: 3 }}
        onClick={() => window.history.back()}
      >
        Back
      </Button>
    </Box>
  );
};

export default Services;
