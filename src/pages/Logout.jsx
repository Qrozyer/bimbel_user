// src/pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Logic logout
    localStorage.removeItem('peserta');
    localStorage.removeItem('token');
    sessionStorage.removeItem('peserta');
    sessionStorage.removeItem('token');

    navigate('/login');
  }, [navigate]);

  return null; // Tidak perlu tampilan apapun
};

export default Logout;
