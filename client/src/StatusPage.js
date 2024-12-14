import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceStatus from "./ServiceStatus";
import Incident from "./Incident";

const StatusPage = () => {
  const [applications, setApplications] = useState([]);
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState("");

  // Fetch application data
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/applications")
      .then((response) => {
        setApplications(response.data);
      })
      .catch((err) => {
        setError("Error fetching applications");
      });
  }, []);

  function getServices(applicationId) {
    setServices([]);
    // Fetch incidents data
    axios
      .get(
        `http://localhost:8000/api/v1/services/applications/${applicationId}`
      )
      .then((response) => {
        setServices(response.data);
      })
      .catch((err) => {
        setError("Error fetching incidents");
      });
  }

  function getIncidents(applicationId) {
    setIncidents([]);
    // Fetch incidents data
    axios
      .get(
        `http://localhost:8000/api/v1/incidents/applications/${applicationId}`
      )
      .then((response) => {
        setIncidents(response.data);
      })
      .catch((err) => {
        setError("Error fetching incidents");
      });
  }

  return (
    <div className="row">
      <div className="col-4">
        <h2>Applications</h2>
        {error && <p>{error}</p>}
        {/* Display Application Statuses */}
        {applications.map((app) => (
          <div key={app._id} className="my-4">
            <h3>{app.name}</h3>
            <p>Status: {app.status}</p>
            <button
              type="button"
              className="btn btn-outline-primary me-3"
              onClick={() => {
                getServices(app._id);
                getIncidents(app._id);
              }}
            >
              Show Status
            </button>
          </div>
        ))}
      </div>
      <div className="col-4">
        <h2>Services</h2>
        {/* Display services under each application */}
        {services && services.length > 0 ? (
          services.map((service) => (
            <ServiceStatus key={service._id} service={service} />
          ))
        ) : (
          <p>No services found</p>
        )}
      </div>
      <div className="col-4">
        <h2>Incidents</h2>
        {/* Display incidents */}
        {incidents.length > 0 ? (
          incidents.map((incident) => (
            <Incident
              key={incident._id}
              incident={incident}
              services={services}
            />
          ))
        ) : (
          <p>No ongoing incidents</p>
        )}
      </div>
    </div>
  );
};

export default StatusPage;
