import React from "react";

const Incident = ({ incident }) => {
  return (
    <div>
      <h4>{incident.name}</h4>
      <p>Status: {incident.status}</p>
      <p>Description: {incident.description}</p>
      <p>Impact: {incident.impact}</p>
    </div>
  );
};

export default Incident;
