import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './modules/fetch';

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};

export default ProtectedRoute;
