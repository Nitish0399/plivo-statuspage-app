import http from "../config/http";

// Application functions
export const loginUser = async (data) => {
  try {
    const response = await http.post(`/public/login`, data);
    return response;
  } catch (error) {
    console.error("Error loggin in user", error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await http.post(`/public/logout`);
    return response;
  } catch (error) {
    console.error("Error logging out user", error);
  }
};

export const getApplications = async () => {
  try {
    const response = await http.get(`/public/applications`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving applications", error);
  }
};

export const getAppServices = async (applicationId) => {
  try {
    const response = await http.get(
      `/public/services/applications/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving services", error);
  }
};

export const listIncidents = async (applicationId) => {
  try {
    const response = await http.get(
      `/public/incidents/applications/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error listing incidents", error);
  }
};
