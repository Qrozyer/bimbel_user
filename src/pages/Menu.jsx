import React from 'react';
import { Link } from 'react-router-dom';
import { FaSitemap, FaClipboardList } from 'react-icons/fa';

const Menu = () => {
  return (
    <div className="home-container">
      <h2 className="overview-header">Menu</h2>

      <div className="overview-grid mt-6">
        {/* Card: Daftar Bidang */}
        <Link to="/daftar-bidang" className="overview-card card-green cursor-pointer hover:shadow-lg transition no-underline">
          <div className="icon-container bg-green text-white">
            <FaSitemap size={24} />
          </div>
          <div>            
            <div className="value">Daftar Bidang</div>
          </div>
        </Link>

        {/* Card: Daftar Ujian */}
        <Link to="/daftar-ujian" className="overview-card card-yellow cursor-pointer hover:shadow-lg transition no-underline">
          <div className="icon-container bg-yellow text-white">
            <FaClipboardList size={24} />
          </div>
          <div>            
            <div className="value">Daftar Ujian</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
