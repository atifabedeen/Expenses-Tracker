import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthentication } from './AuthenticationContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthentication();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
