import React, { useEffect, useState } from "react";
import { FaBell, FaUserCircle, FaSignOutAlt, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [dateTime, setDateTime] = useState(new Date());
  const [showNotif, setShowNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    const storedNotif = localStorage.getItem('notifikasi');
    if (storedNotif) setNotifMessage(storedNotif);

    return () => clearInterval(timer);
  }, []);

  // Auto-close notifikasi setelah 3 detik (opsional)
  useEffect(() => {
    if (showNotif) {
      const timer = setTimeout(() => setShowNotif(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotif]);

  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const dayName = days[dateTime.getDay()];
  const dateString = dateTime.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeString = dateTime.toLocaleTimeString('id-ID');

  const handleToggleNotif = () => {
    setShowNotif(!showNotif);
  };

  return (
    <nav className="bg-gray-100 px-8 pt-6 pb-4 sticky top-0 flex justify-between items-center text-gray-800 z-50 relative">
      {/* Tanggal dan waktu */}
      <div className="font-semibold text-sm md:text-base">
        {`${dayName}, ${dateString} — ${timeString}`}
      </div>

      {/* Ikon menu kanan */}
      <div className="flex items-center gap-4 text-xl">
        <button onClick={() => navigate('/')} aria-label="Beranda" style={btnStyle}>
          <FaHome />
        </button>

        {/* Notifikasi */}
        <div className="relative">
          <button onClick={handleToggleNotif} aria-label="Notifikasi" style={btnStyle} className="relative flex items-center justify-center">
            <FaBell />
            {notifMessage && (
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2.5 h-2.5 border-2 border-white"></span>
            )}
          </button>

          {showNotif && notifMessage && (
            <div className="fixed top-[70px] left-4 right-4 sm:absolute sm:top-auto sm:left-auto sm:right-0 mt-3 w-[90vw] sm:w-80 bg-white shadow-xl border rounded-xl z-[999]">
              <div className="p-3 border-b font-semibold text-gray-700 text-sm md:text-base">
                Notifikasi (1)
              </div>
              <div className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                <div className="font-medium mb-1 text-red-600 text-sm md:text-base">Penting!</div>
                <div className="text-xs md:text-sm">{notifMessage}</div>
                <div className="text-xs text-gray-400 mt-1">Baru saja</div>
              </div>
            </div>
          )}
        </div>

        <button onClick={() => navigate('/profil')} aria-label="Profil" style={btnStyle}>
          <FaUserCircle />
        </button>
        <button onClick={() => navigate('/logout')} aria-label="Logout" style={btnStyle}>
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
};

const btnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default Navbar;
