import { Card } from "@/components/ui/card";
import React from "react";

const ServiceStatus = ({ service }) => {
  // Function to determine the Chip color based on the service status
  const getStatusColor = (status) => {
    switch (status) {
      case "Operational":
        return "bg-green-500 text-white"; // Green
      case "Degraded Performance":
        return "bg-yellow-500 text-white"; // Yellow
      case "Partial Outage":
        return "bg-blue-500 text-white"; // Blue
      case "Major Outage":
        return "bg-red-500 text-white"; // Red
      default:
        return "bg-gray-500 text-white"; // Gray for unknown statuses
    }
  };

  return (
    <Card className="mb-4 shadow-lg rounded-lg bg-white p-4">
      <div>
        {/* Service Name */}
        <h3 className="text-xl font-semibold mb-2">
          {service.name || "Unnamed Service"}
        </h3>

        {/* Status Display */}
        <div className="flex items-center mt-2">
          <p className="text-sm text-gray-600 mr-4 font-semibold">Status:</p>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
              service.status
            )}`}
          >
            {service.status || "Unknown"}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ServiceStatus;
