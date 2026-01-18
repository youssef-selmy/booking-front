import React from "react";
import { useAuth } from "../../store/AuthProvider";
import { Navigate } from "react-router-dom";

const ManagerAuth = ({ children }) => {
  const { isOwner, loading } = useAuth();
  if (loading) return null;
  return isOwner ? children : <Navigate to="/not-found" replace />;
};

export default ManagerAuth;
