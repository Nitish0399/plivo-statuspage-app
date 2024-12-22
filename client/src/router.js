import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/Main";
import AuthLayout from "./layouts/Auth";

// Components
import Login from "./components/Public/Login";
import StatusPage from "./components/Public/StatusPage";
import Applications from "./components/Home/Application";
import Services from "./components/Home/Service";
import Incidents from "./components/Home/Incident";
import AddApplication from "./components/Home/Application/AddApplication";
import AddService from "./components/Home/Service/AddService";
import AddIncident from "./components/Home/Incident/AddIncident";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Login />} />
        <Route path="/status" element={<StatusPage />} />
      </Route>

      {/* Nested routes under /home */}
      <Route path="/home" element={<AuthLayout />}>
        <Route index element={<Applications />} />
        <Route path="applications">
          <Route index element={<Applications />} />
          <Route path=":id" element={<Services />} />
          <Route path=":id/incidents" element={<Incidents />} />
          <Route path=":id/add-service" element={<AddService />} />
          <Route path=":id/add-incident" element={<AddIncident />} />
        </Route>
        <Route path="add-application" element={<AddApplication />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
