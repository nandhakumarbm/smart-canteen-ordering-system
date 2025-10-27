import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('smart-canteen-ordering-system');

    if (token) {
        try {
            const user = jwtDecode(token);
            return user.role === 'admin' ? (
                <Navigate to="/admin" replace />
            ) : (
                <Navigate to="/student" replace />
            );
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem('smart-canteen-ordering-system');
        }
    }

    return children; // render login page if no token
};

export default PublicRoute;
