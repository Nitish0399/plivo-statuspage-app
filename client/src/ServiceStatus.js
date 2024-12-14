import React from "react";

const ServiceStatus = ({ service }) => {
  return (
    <div>
      <h4>{service.name}</h4>
      <p>Status: {service.status}</p>
    </div>
  );
};

export default ServiceStatus;
