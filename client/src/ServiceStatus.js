import React from "react";

const ServiceStatus = ({ service }) => {
  return (
    <div className="my-4">
      <h4>{service.name}</h4>
      <p>Status: {service.status}</p>
    </div>
  );
};

export default ServiceStatus;
