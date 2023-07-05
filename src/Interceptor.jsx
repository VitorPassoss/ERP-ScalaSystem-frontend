import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';

const useAuth = () => {
  const user = Cookies.get('auth_cookie');
  if(user) {
    return true;
  } else {
    return false;
  }
}

const ProtectedRoutes = ({ children }) => {
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children
};

export default ProtectedRoutes;