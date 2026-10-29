import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../../store/authStore';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
