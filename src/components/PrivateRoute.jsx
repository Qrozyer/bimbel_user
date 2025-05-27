import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const pesertaData = JSON.parse(localStorage.getItem('peserta') || sessionStorage.getItem('peserta') || '{}');

  if (!token || !pesertaData?.peserta) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
