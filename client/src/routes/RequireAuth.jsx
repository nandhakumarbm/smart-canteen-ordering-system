import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RequireAuth = ({ role }) => {
  const token = localStorage.getItem('smart-canteen-ordering-system');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem('smart-canteen-ordering-system');
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return user.role === 'admin' ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/student" replace />
    );
  }

  return <Outlet />; // render nested routes
};

export default RequireAuth;
