import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const peserta = JSON.parse(localStorage.getItem('peserta') || sessionStorage.getItem('peserta') || '{}');
  const isDefaultPassword = peserta?.peserta?.isDefaultPassword === true;

  if (!token || !peserta?.peserta) {
    return <Navigate to="/login" replace />;
  }

  // Jika password masih default dan bukan sedang di halaman ganti password
  if (isDefaultPassword && location.pathname !== '/ganti-password') {
    return <Navigate to="/ganti-password" replace />;
  }

  // Jika sudah bukan default password tapi buka ganti-password secara langsung
  if (!isDefaultPassword && location.pathname === '/ganti-password') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
