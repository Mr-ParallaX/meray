import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isDemoAuthenticated } from '../../config/demoAuth';

const AdminAuthGuard = ({ children }) => {
  const location = useLocation();

  if (!isDemoAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminAuthGuard;
