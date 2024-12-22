import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";

import { createApplication } from "../../../api/internal";

const AddApplication = () => {
  const handleAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    await createApplication({
      name: formData.get("name"),
      description: formData.get("description"),
    });
    window.history.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        padding: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bold" }}
        >
          Add New Application
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ marginBottom: 3 }}
        >
          Enter the application details below.
        </Typography>
        <form onSubmit={handleAdd}>
          <TextField
            name="name"
            label="Application Name"
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
              Add Application
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddApplication;
