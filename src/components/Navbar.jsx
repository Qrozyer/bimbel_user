import React from "react";
import { useNavigate } from 'react-router-dom';
import { Bell, UserCircle, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('peserta');
    localStorage.removeItem('token');
    sessionStorage.removeItem('peserta');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="w-full h-16 bg-white shadow-sm flex items-center justify-between px-6">
      {/* Brand Name */}
      <div className="text-xl font-semibold text-[#20b486] tracking-wide">
        Bimbel Kebidanan
      </div>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <button className="text-gray-600 hover:text-[#20b486] transition">
          <Bell size={22} />
        </button>
        <button className="text-gray-600 hover:text-[#20b486] transition" onClick={() => navigate('/profil')}>
          <UserCircle size={22} />
        </button>
        <button className="text-gray-600 hover:text-red-500 transition" onClick={handleLogout}>
          <LogOut size={22} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
