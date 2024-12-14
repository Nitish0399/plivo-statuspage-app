import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceStatus from "./ServiceStatus";
import Incident from "./Incident";

const StatusPage = () => {
  const [applications, setApplications] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState("");

  let applicationId = "sdfgdfsg";

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
  }, []);

  return (
    <div>
      <h2>Applications Status</h2>
      {error && <p>{error}</p>}

      {/* Display Application Statuses */}
      {applications.map((app) => (
        <div key={app._id}>
          <h3>{app.name}</h3>
          <p>Status: {app.status}</p>

          {/* Display services under each application */}
          {app.services &&
            app.services.map((service) => (
              <ServiceStatus key={service._id} service={service} />
            ))}
        </div>
      ))}

      <h2>Incidents</h2>
      {/* Display incidents */}
      {incidents.length > 0 ? (
        incidents.map((incident) => (
          <Incident key={incident._id} incident={incident} />
        ))
      ) : (
        <p>No ongoing incidents</p>
      )}
    </div>
  );
};

export default StatusPage;
