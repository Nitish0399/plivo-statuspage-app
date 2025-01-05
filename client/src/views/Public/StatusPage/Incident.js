import { Card } from "@/components/ui/card";
import React from "react";

const Incident = ({ incident, services }) => {
  return (
    <Card className="mb-6 shadow-lg rounded-lg bg-white p-4">
      {/* Incident Title */}
      <h2 className="text-lg font-semibold mb-2">
        {incident.title || "Untitled Incident"}
      </h2>

      {/* Incident Status */}
      <p className="text-sm text-gray-600 mb-4">
        <strong>Status:</strong> {incident.status || "No status available"}
      </p>

      {/* Incident Description */}
      <p className="text-sm text-gray-600 mb-4">
        <strong>Description:</strong>{" "}
        {incident.description || "No description provided."}
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Impacted Services Section */}
      <p className="text-sm text-gray-600 mb-4">
        <strong>Impact:</strong>
      </p>

      <div className="grid grid-cols-2 gap-2">
        {incident.affectedServices.length > 0 ? (
          incident.affectedServices.map((serviceId) => {
            const service = services.find((ob) => ob._id === serviceId);
            return (
              service && (
                <span
                  key={service._id}
                  className="px-2 py-1 text-sm font-medium text-primary border border-primary rounded-md capitalize"
                >
                  {service.name}
                </span>
              )
            );
          })
        ) : (
          <p className="text-sm text-gray-500 col-span-2">
            No impacted services found.
          </p>
        )}
      </div>
    </Card>
  );
};

export default Incident;
