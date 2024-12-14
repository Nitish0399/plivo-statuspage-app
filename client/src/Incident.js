import React from "react";

const Incident = ({ incident, services }) => {
  return (
    <div className="my-4">
      <h4>{incident.name}</h4>
      <p>Status: {incident.status}</p>
      <p>Description: {incident.description}</p>
      <p>
        Impact:{" "}
        <b>
          {incident.affectedServices.map((serviceId) => {
            const service = services.find((ob) => ob._id == serviceId);
            return service.name;
          })}
        </b>
      </p>
    </div>
  );
};

export default Incident;
