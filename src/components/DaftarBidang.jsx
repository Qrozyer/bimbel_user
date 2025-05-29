import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DaftarBidang.css';
import m1 from '../assets/images/m1.jpg';
import m2 from '../assets/images/m2.jpg';
import m3 from '../assets/images/m3.jpg';
import m4 from '../assets/images/m4.jpg';
import m5 from '../assets/images/m5.jpg';
import m6 from '../assets/images/m6.jpg';

const images = [m1, m2, m3, m4, m5, m6];

const DaftarBidang = ({ data }) => {
  const navigate = useNavigate();

  if (!data || !Array.isArray(data)) {
    return <div>Data kosong</div>;
  }

  const handleCardClick = (bidangId) => {
    navigate(`/sub-bidang/${bidangId}`);
  };

  return (
    <div className="bidang-grid">
      {data.map((item, index) => (
        <div
          key={item.BidangId}
          className="bidang-card"
          onClick={() => handleCardClick(item.BidangId)}
        >
          <img
            src={images[index % images.length]}
            alt={item.BidangNama}
            className="bidang-image"
          />
          <div className="bidang-content">
            <h4>{item.BidangNama}</h4>
            <p>{item.BidangDeskripsi || 'Deskripsi tidak tersedia'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DaftarBidang;
