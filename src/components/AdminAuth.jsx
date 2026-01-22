import React from "react";
import { useAuth } from "../../store/AuthProvider";
import { Navigate } from "react-router-dom";

const AdminAuth = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  console.log(isAdmin)
  if (loading) return null;
  return isAdmin ? children : <Navigate to="/not-authorized" replace />;
};

export default AdminAuth;
