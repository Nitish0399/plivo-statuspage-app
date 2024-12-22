import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import { Warning, Delete } from "@mui/icons-material";

import {
  getAppServices,
  listIncidents,
  deleteIncident,
} from "../../../api/internal";

const Incidents = () => {
  const { id } = useParams();
  const [incidents, setIncidents] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch applications, incidents, and services on mount
    const fetchData = async () => {
      const serviceData = await getAppServices(id);
      setServices(serviceData);

      const incidentData = await listIncidents(id);
      setIncidents(incidentData);
    };
    fetchData();
  }, [id]);

  const handleDeleteIncident = async (incidentId) => {
    try {
      await deleteIncident(incidentId); // Call the deleteIncident function to delete the incident
      setIncidents(incidents.filter((incident) => incident._id !== incidentId)); // Remove the incident from the list
    } catch (error) {
      console.error("Error deleting incident:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Application Incidents
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Track and manage the incidents impacting your application services.
      </Typography>

      <List sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
        {incidents.length > 0 ? (
          incidents.map((incident) => (
            <React.Fragment key={incident._id}>
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "error.main" }}>
                    <Warning />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {incident.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {incident.description}
                      </Typography>
                      <Typography variant="body2" color="text.primary" mt={1}>
                        <b>Impact:</b>{" "}
                        {incident.affectedServices.map((serviceId) => {
                          const service = services.find(
                            (ob) => ob._id === serviceId
                          );
                          return service ? (
                            <Chip
                              key={serviceId}
                              label={service.name}
                              size="small"
                              sx={{ marginRight: 0.5 }}
                            />
                          ) : null;
                        })}
                      </Typography>
                    </>
                  }
                />
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteIncident(incident._id)}
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
            No incidents reported for this application.
          </Typography>
        )}
      </List>

      <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
        <Button
          variant="contained"
          component={Link}
          to={`/home/applications/${id}/add-incident`}
        >
          Add Incident
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
};

export default Incidents;
