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
  FaBars,
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isMobile = false }) => {
  const { pathname } = useLocation();
  const [isKelolaOpen, setIsKelolaOpen] = useState(false);

  const isActive = (path) => pathname === path ? 'active-link' : '';

  if (isMobile) {
    return (
      <aside className="sidebar-mobile-card">
        <Link to="/" className={isActive('/')}>
          <FaHome size={22} />
        </Link>
        <Link to="/bidangmu" className={isActive('/bidangmu')}>
          <FaBook size={22} />
        </Link>
        <Link to="/ujianmu" className={isActive('/ujianmu')}>
          <FaClipboardList size={22} />
        </Link>
        <Link to="/profil" className={isActive('/profil')}>
          <FaUserCircle size={22} />
        </Link>
        <Link to="/menu" className={isActive('/menu')}>
          <FaBars size={22} />
        </Link>
      </aside>
    );
  }

  return (
    <aside className="sidebar-card">
      <h2 className="sidebar-title">Bimbel Kebidanan</h2>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className={`sidebar-item ${isActive('/')}`}>
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/bidangmu" className={`sidebar-item ${isActive('/bidangmu')}`}>
              <FaBook className="mr-3" />
              Materimu
            </Link>
          </li>
          <li>
            <Link to="/ujianmu" className={`sidebar-item ${isActive('/ujianmu')}`}>
              <FaClipboardList className="mr-3" />
              Ujianmu
            </Link>
          </li>
          <li>
            <button
              onClick={() => setIsKelolaOpen(!isKelolaOpen)}
              className="sidebar-item w-full flex justify-between items-center"
            >
              <div className="flex items-center">
                <FaBriefcase className="mr-3" />
                Menu
              </div>
              {isKelolaOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isKelolaOpen && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link to="/daftar-bidang" className={`sidebar-sub ${isActive('/daftar-bidang')}`}>
                    <FaSitemap className="mr-2" />
                    Daftar Bidang
                  </Link>
                </li>
                <li>
                  <Link to="/daftar-ujian" className={`sidebar-sub ${isActive('/daftar-ujian')}`}>
                    <FaClipboardList className="mr-2" />
                    Daftar Ujian
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/profil" className={`sidebar-item ${isActive('/profil')}`}>
              <FaUserCircle className="mr-3" />
              Profil
            </Link>
          </li>
          <li>
            <Link to="/logout" className="sidebar-item logout-link">
              <FaSignOutAlt className="mr-3" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
