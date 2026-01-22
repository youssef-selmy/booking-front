import React from "react";
import { useAuth } from "../../store/AuthProvider";
import { Navigate } from "react-router-dom";

const ManagerAuth = ({ children }) => {
  const { isManager, loading } = useAuth();
  if (loading) return null;
  return isManager ? children : <Navigate to="/not-authorized" replace />;
};

export default ManagerAuth;
