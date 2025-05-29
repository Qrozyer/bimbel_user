import React, { useEffect, useState } from "react";
import { FaBell, FaUserCircle, FaSignOutAlt, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // State untuk tanggal & waktu realtime
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format hari, tanggal, waktu
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const dayName = days[dateTime.getDay()];
  const dateString = dateTime.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeString = dateTime.toLocaleTimeString('id-ID');

  const handleLogout = () => {
    localStorage.removeItem('peserta');
    localStorage.removeItem('token');
    sessionStorage.removeItem('peserta'); 
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      className="bg-gray-100"
      style={{
        paddingTop: '1.5rem',        
        paddingLeft: '2rem',
        paddingRight: '2rem',
        position: 'sticky',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'none',        
        color: '#333',
      }}
    >
      {/* Kiri: Hari, tanggal, waktu */}
      <div style={{ fontWeight: '600', fontSize: '1rem' }}>
        {`${dayName}, ${dateString} — ${timeString}`}
      </div>

      {/* Kanan: icon home, notif, profil, logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '1.3rem' }}>
        <button
          aria-label="Beranda"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          onClick={() => navigate('/')}
        >
          <FaHome />
        </button>

        <button
          aria-label="Notifikasi"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          onClick={() => alert('Fitur notifikasi belum ada')}
        >
          <FaBell />
        </button>

        <button
          aria-label="Profil"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          onClick={() => navigate('/profil')}
        >
          <FaUserCircle />
        </button>

        <button
          aria-label="Logout"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          onClick={handleLogout}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
