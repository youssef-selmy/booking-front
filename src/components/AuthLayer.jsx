import React from "react";
import { useAuth } from "../../store/AuthProvider";
import { Navigate } from "react-router-dom";

const AuthLayer = ({ children, roles = [] }) => {
  const { loading, role, isAuthenticated } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return roles.includes(role) ? (
    children
  ) : (
    <Navigate to="/not-authorized" replace />
  );
};

export default AuthLayer;
