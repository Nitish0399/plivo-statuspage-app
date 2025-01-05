import AuthLayout from "./layouts/Auth";
// Layouts
import MainLayout from "./layouts/Main";
import Applications from "./views/Home/Application";
import AddApplication from "./views/Home/Application/AddApplication";
import Incidents from "./views/Home/Incident";
import AddIncident from "./views/Home/Incident/AddIncident";
import Services from "./views/Home/Service";
import AddService from "./views/Home/Service/AddService";
// Components
import Login from "./views/Public/Login";
import StatusPage from "./views/Public/StatusPage";
import React from "react";
import { Routes, Route } from "react-router-dom";

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
