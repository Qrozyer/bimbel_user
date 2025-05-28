import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBriefcase, FaSitemap, FaBook, FaFileAlt, FaUserCircle, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';

const Sidebar = () => {
  const { pathname } = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/' },
    { label: 'Bidang', icon: <FaBriefcase />, path: '/bidang-list' },
    { label: 'Sub Bidang', icon: <FaSitemap />, path: '/sub-bidang' },
    { label: 'Materi', icon: <FaBook />, path: '/materi' },
    { label: 'Ujian', icon: <FaClipboardList />, path: '/ujian' },
    { label: 'Hasil Ujian', icon: <FaFileAlt />, path: '/laporan-ujian' },
    { label: 'Profil', icon: <FaUserCircle />, path: '/profil' },
    { label: 'Logout', icon: <FaSignOutAlt />, path: '/logout' },
  ];

  return (
    <aside 
      className="bg-white p-4 rounded-2xl shadow-xl m-4 w-64 sticky top-0"       
    >
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">Bimbel Kebidanan</h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-all hover:bg-indigo-100 hover:text-indigo-700 ${
                  pathname === item.path ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-700'
                }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
