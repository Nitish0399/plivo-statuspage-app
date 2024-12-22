import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
} from "@mui/material";

const Incident = ({ incident, services }) => {
  return (
    <Card
      sx={{
        marginBottom: 3,
        boxShadow: 4,
        borderRadius: 2,
        bgcolor: "background.paper",
        padding: 2,
      }}
    >
      <CardContent>
        {/* Incident Title */}
        <Typography variant="h5" component="div" gutterBottom>
          {incident.title || "Untitled Incident"}
        </Typography>

        {/* Incident Status */}
        <Typography variant="body1" color="text.secondary" paragraph>
          <b>Status:</b> {incident.status || "No status available"}
        </Typography>

        {/* Incident Description */}
        <Typography variant="body1" color="text.secondary" paragraph>
          <b>Description:</b>{" "}
          {incident.description || "No description provided."}
        </Typography>

        {/* Divider for clarity */}
        <Divider sx={{ marginY: 2 }} />

        {/* Impacted Services Section */}
        <Typography variant="body1" color="text.secondary" paragraph>
          <b>Impact:</b>
        </Typography>

        <Grid container spacing={2}>
          {incident.affectedServices.length > 0 ? (
            incident.affectedServices.map((serviceId) => {
              const service = services.find((ob) => ob._id === serviceId);
              return (
                service && (
                  <Grid item key={service._id}>
                    <Chip
                      label={service.name}
                      color="primary"
                      variant="outlined"
                      sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    />
                  </Grid>
                )
              );
            })
          ) : (
            <Typography variant="body2" color="text.secondary">
              No impacted services found.
            </Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Incident;
