// src/AppRoutes.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./auth/LoginPage";
import PrivateRoute from "./PrivatedRoute";
import Projects from "./pages/Projects";
import TestDetail from "./pages/TestDetail";
import ProjectsDetail from "./pages/ProjectsDetail";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />

        <Route
          path="/detail/:title/:id"
          element={
            <PrivateRoute>
              <TestDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/detail/:projectName/:projectId"
          element={
            <PrivateRoute>
              <ProjectsDetail />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
