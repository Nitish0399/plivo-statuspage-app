import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Paper,
  Chip,
} from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";

import { getAppServices, createIncident } from "../../../api/internal";

const AddIncident = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [impactedServices, setImpactedServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const serviceData = await getAppServices(id);
      setServices(serviceData);
    };
    fetchData();
  }, [id]);

  const handleAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    await createIncident({
      applicationId: id,
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
      affectedServices: impactedServices,
    });
    window.history.back();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setImpactedServices(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 700,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bold" }}
        >
          Add New Incident
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ marginBottom: 3 }}
        >
          Enter the details below to log a new incident.
        </Typography>
        <form onSubmit={handleAdd}>
          <TextField
            name="title"
            label="Incident Title"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            autoFocus
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-id-label">Status</InputLabel>
            <Select
              labelId="status-id-label"
              id="status-id"
              name="status"
              label="Status"
              defaultValue=""
            >
              <MenuItem value="ongoing">Ongoing</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="service-ids-label">Impacted Services</InputLabel>
            <Select
              labelId="service-ids-label"
              id="service-ids"
              name="serviceIds"
              label="Impacted Services"
              value={impactedServices}
              onChange={handleChange}
              multiple
              renderValue={(selected) =>
                selected.map((value) => {
                  const service = services.find((s) => s._id === value);
                  return <Chip key={value} label={service?.name || value} />;
                })
              }
            >
              {services.map((service, index) => (
                <MenuItem key={`service-${index}`} value={service._id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginTop: 3,
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="button"
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => window.history.back()}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              color="primary"
            >
              Add Incident
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddIncident;
