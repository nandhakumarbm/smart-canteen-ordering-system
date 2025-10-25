import { Navigate } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Login from '../pages/Auth/Login/Login';
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "579898550793-n7ihfdh7b53kkfehe0jmluh272k3aa4t.apps.googleusercontent.com";

const routes = [
  { path: '/login', element: <GoogleOAuthProvider clientId={clientId}><Login /></GoogleOAuthProvider> },

  {
    path: '/student',
    element: <RequireAuth role="student" />,
    children: [],
  },

  {
    path: '/admin',
    element: <RequireAuth role="admin" />,
    children: [],
  },

  { path: '*', element: <Navigate to="/login" replace /> },
];

export default routes;
