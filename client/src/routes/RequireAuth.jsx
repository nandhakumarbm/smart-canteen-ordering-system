import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ role }) => {
  const user = JSON.parse(localStorage.getItem('smart-canteen-ordering-system'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return user.role === 'admin' ? <Navigate to="/admin/dashboard" replace />
                                  : <Navigate to="/student/dashboard" replace />;
  }

  return <Outlet />; // renders nested routes
};

export default RequireAuth;
