import {
  getApplications,
  getAppServices,
  listIncidents,
} from "../../../api/public";
import Incident from "./Incident";
import Service from "./Service";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const StatusPage = () => {
  const [applications, setApplications] = useState([]);
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await getApplications();
        setApplications(response);
      } catch (err) {
        setError("Failed to fetch applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchServices = async (applicationId) => {
    setServices([]);
    setLoading(true);

    try {
      const response = await getAppServices(applicationId);
      setServices(response);
    } catch (err) {
      setError("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  const fetchIncidents = async (applicationId) => {
    setIncidents([]);
    setLoading(true);

    try {
      const response = await listIncidents(applicationId);
      setIncidents(response);
    } catch (err) {
      setError("Failed to fetch incidents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("statusUpdate", (payload) => {
      const { serviceId, status } = payload;
      setServices((prev) =>
        prev.map((ob) => (ob._id === serviceId ? { ...ob, status } : ob))
      );
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      {loading && (
        <div className="flex justify-center mb-4">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applications Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Applications</h3>
          <Separator className="mb-4" />
          {applications.length > 0 ? (
            applications.map((app) => (
              <Card
                key={app._id}
                className="mb-4 shadow-md hover:shadow-xl transition duration-300 ease-in-out"
              >
                <CardHeader className="pb-2">
                  <h4 className="text-xl font-semibold text-gray-900">
                    {app.name}
                  </h4>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-2 text-gray-700">
                    Status: {app.status || "Unknown"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      fetchServices(app._id);
                      fetchIncidents(app._id);
                    }}
                    className="w-full bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Show Status
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-600">No applications found.</p>
          )}
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <Separator className="mb-4" />
          {services.length > 0 ? (
            services.map((service) => (
              <Service key={service._id} service={service} />
            ))
          ) : (
            <p className="text-gray-600">No services found.</p>
          )}
        </div>

        {/* Incidents Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Incidents</h3>
          <Separator className="mb-4" />
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <Incident
                key={incident._id}
                incident={incident}
                services={services}
              />
            ))
          ) : (
            <p className="text-gray-600">No ongoing incidents.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
