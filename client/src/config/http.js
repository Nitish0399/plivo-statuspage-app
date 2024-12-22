import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/v1",
  withCredentials: true, // Ensures cookies are included with every request
});

// Response Interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = "/";
    }
    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services"
    );
  }
);

export default http;
