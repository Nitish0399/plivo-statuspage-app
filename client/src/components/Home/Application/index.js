import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";
import { Folder, Delete, Add } from "@mui/icons-material";

import { getApplications, deleteApplication } from "../../../api/internal";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications on mount
    const fetchData = async () => {
      const appData = await getApplications();
      setApplications(appData);
    };
    fetchData();
  }, []);

  const handleDeleteApplication = async (applicationId) => {
    try {
      await deleteApplication(applicationId); // Delete the application
      setApplications(
        applications.filter((application) => application._id !== applicationId)
      ); // Update the application list
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Applications
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Manage and explore all your applications in one place.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
        <Button
          variant="contained"
          component={Link}
          to="/home/add-application"
          startIcon={<Add />}
        >
          Add Application
        </Button>
      </Stack>

      <List sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
        {applications.length > 0 ? (
          applications.map((app) => (
            <React.Fragment key={app._id}>
              <ListItem alignItems="between" sx={{ py: 2 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <Folder />
                  </Avatar>
                </ListItemAvatar>
                <ListItemButton
                  component={Link}
                  to={`/home/applications/${app._id}`}
                  sx={{ flex: 1 }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {app.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {app.description}
                      </Typography>
                    }
                  />
                </ListItemButton>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteApplication(app._id)}
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
            No applications found. Start by adding a new application.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default Applications;
