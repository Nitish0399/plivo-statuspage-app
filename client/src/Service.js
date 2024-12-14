import React from "react";

const Service = ({ service }) => {
  return (
    <div>
      <h4>{service.name}</h4>
      <p>Status: {service.status}</p>
    </div>
  );
};

export default Service;
