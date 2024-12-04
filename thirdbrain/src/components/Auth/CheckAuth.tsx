import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, children }) => {
  const location = useLocation();

  // Redirect authenticated users away from signin/signup pages
  if (isAuthenticated && (location.pathname === "/auth/signin" || location.pathname === "/auth/signup")) {
    return <Navigate to="/" replace />;
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && location.pathname !== "/auth/signin" && location.pathname !== "/auth/signup") {
    return <Navigate to="/auth/signin" replace />;
  }

  // Render the children components if conditions are met
  return children;
};

export default CheckAuth;
