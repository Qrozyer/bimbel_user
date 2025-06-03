import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaBriefcase,
  FaSitemap,
  FaBars
} from 'react-icons/fa';
import './Sidebar.css'; 

const Sidebar = ({ isMobile = false }) => {
  const { pathname } = useLocation();
  const [isKelolaOpen, setIsKelolaOpen] = useState(false);

  // Untuk mobile, hanya icon, tanpa teks
  if (isMobile) {
    return (
      <aside className="sidebar-mobile fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-md z-50 flex justify-around py-4">
        <Link to="/" className={`text-center ${pathname === '/' ? 'text-[#28cc98]' : 'text-gray-600'}`}>
          <FaHome size={22} />
        </Link>
        <Link to="/bidangmu" className={`text-center ${pathname === '/bidangmu' ? 'text-[#28cc98]' : 'text-gray-600'}`}>
          <FaBook size={22} />
        </Link>
        <Link to="/ujianmu" className={`text-center ${pathname === '/ujianmu' ? 'text-[#28cc98]' : 'text-gray-600'}`}>
          <FaClipboardList size={22} />
        </Link>
        <Link to="/profil" className={`text-center ${pathname === '/profil' ? 'text-[#28cc98]' : 'text-gray-600'}`}>
          <FaUserCircle size={22} />
        </Link>
        <Link to="/menu" className={`text-center ${pathname === '/menu' ? 'text-[#28cc98]' : 'text-gray-600'}`}>
        <FaBars size={22} />
      </Link>
      </aside>
    );
  }

  // Versi desktop
  const getLinkClass = (path) =>
    `flex items-center p-3 rounded-lg no-underline transition-all hover:bg-[#d0f5eb] hover:text-[#28cc98] ${
      pathname === path ? 'bg-[#d0f5eb] text-[#28cc98] font-semibold' : 'text-gray-700'
    }`;

  const getSubmenuClass = (path) =>
    `flex items-center p-2 rounded-md no-underline hover:bg-[#d0f5eb] hover:text-[#28cc98] ${
      pathname === path ? 'bg-[#d0f5eb] text-[#28cc98] font-semibold' : 'text-gray-700'
    }`;

  return (
    <aside className="bg-white p-2 pt-4 rounded-2xl shadow-xl m-5 w-64 sticky top-0 flex flex-col justify-between h-[calc(80vh-40px)]">
      <div>
        <h2 className="text-2xl font-bold text-[#28cc98] mb-6 text-center">Bimbel Kebidanan</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/" className={getLinkClass('/')}>
                <FaTachometerAlt className="text-lg mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/bidangmu" className={getLinkClass('/bidangmu')}>
                <FaBook className="text-lg mr-3" />
                Materimu
              </Link>
            </li>
            <li>
              <Link to="/ujianmu" className={getLinkClass('/ujianmu')}>
                <FaClipboardList className="text-lg mr-3" />
                Ujianmu
              </Link>
            </li>
            <li>
              <button
                onClick={() => setIsKelolaOpen(!isKelolaOpen)}
                className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-[#d0f5eb] hover:text-[#28cc98] transition-all"
              >
                <div className="flex items-center">
                  <FaBriefcase className="text-lg mr-3" />
                  Menu
                </div>
                {isKelolaOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isKelolaOpen && (
                <ul className="pl-8 mt-2 space-y-1">
                  <li>
                    <Link to="/daftar-bidang" className={getSubmenuClass('/daftar-bidang')}>
                      <FaSitemap className="mr-2" />
                      Daftar Bidang
                    </Link>
                  </li>
                  <li>
                    <Link to="/daftar-ujian" className={getSubmenuClass('/daftar-ujian')}>
                      <FaClipboardList className="mr-2" />
                      Daftar Ujian
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/profil" className={getLinkClass('/profil')}>
                <FaUserCircle className="text-lg mr-3" />
                Profil
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className={`flex items-center p-3 rounded-lg no-underline transition-all hover:bg-red-100 hover:text-red-700 ${
                  pathname === '/logout' ? 'bg-red-100 text-red-700 font-semibold' : 'text-gray-600'
                }`}
              >
                <FaSignOutAlt className="text-lg mr-3" />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
