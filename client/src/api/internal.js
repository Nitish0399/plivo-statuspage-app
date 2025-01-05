import http from "../config/http";

// Application functions
export const createApplication = async (data) => {
  try {
    const response = await http.post(`/applications`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating application", error);
    throw error;
  }
};

export const getApplications = async () => {
  try {
    const response = await http.get(`/applications`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving applications", error);
  }
};

export const getApplication = async (id) => {
  try {
    const response = await http.get(`/applications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving application", error);
  }
};

export const updateApplication = async (id, data) => {
  try {
    const response = await http.put(`/applications/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating application", error);
  }
};

export const deleteApplication = async (id) => {
  try {
    const response = await http.delete(`/applications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting application", error);
  }
};

// Incident functions
export const createIncident = async (data) => {
  try {
    const response = await http.post(`/incidents`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating incident", error);
    throw error;
  }
};

export const updateIncident = async (incidentId, data) => {
  try {
    const response = await http.put(`/incidents/${incidentId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating incident", error);
  }
};

export const getIncident = async (incidentId) => {
  try {
    const response = await http.get(`/incidents/${incidentId}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving incident", error);
  }
};

export const listIncidents = async (applicationId) => {
  try {
    const response = await http.get(`/incidents/applications/${applicationId}`);
    return response.data;
  } catch (error) {
    console.error("Error listing incidents", error);
  }
};

export const deleteIncident = async (incidentId) => {
  try {
    const response = await http.delete(`/incidents/${incidentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting incident", error);
  }
};

// Service functions
export const createService = async (data) => {
  try {
    const response = await http.post(`/services`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating service", error);
    throw error;
  }
};

export const getAppServices = async (applicationId) => {
  try {
    const response = await http.get(`/services/applications/${applicationId}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving services", error);
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await http.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving service", error);
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await http.put(`/services/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating service", error);
  }
};

export const deleteService = async (id) => {
  try {
    const response = await http.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting service", error);
  }
};
