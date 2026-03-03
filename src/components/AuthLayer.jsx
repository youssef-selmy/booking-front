import React from "react";
import { useAuth } from "../../store/AuthProvider";
import { Navigate } from "react-router-dom";

const AuthLayer = ({ children, roles = [] }) => {
  const { loading, role, isAuthenticated, hasActiveSubscription } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const requiresSubscription = role !== "admin";
  if (requiresSubscription && !hasActiveSubscription) {
    return <Navigate to="/subscription" replace />;
  }

  return roles.includes(role) ? (
    children
  ) : (
    <Navigate to="/not-authorized" replace />
  );
};

export default AuthLayer;
