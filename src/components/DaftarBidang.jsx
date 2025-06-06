import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/api';
import './DaftarBidang.css';
import m1 from '../assets/images/m1.jpg';
import m2 from '../assets/images/m2.jpg';
import m3 from '../assets/images/m3.jpg';
import m4 from '../assets/images/m4.jpg';
import m5 from '../assets/images/m5.jpg';
import m6 from '../assets/images/m6.jpg';

const images = [m1, m2, m3, m4, m5, m6];

const DaftarBidang = ({ data }) => {
  const [akses, setAkses] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const peserta = JSON.parse(localStorage.getItem('peserta')) || JSON.parse(sessionStorage.getItem('peserta'));
  const pesertaId = peserta?.peserta?.PesertaId;

  useEffect(() => {
    const fetchAksesBidang = async () => {
      const hasil = {};

      await Promise.all(data.map(async (item) => {
        try {
          const res = await fetchData(`peserta/bidang/${item.BidangId}`);
          if (Array.isArray(res)) {
            const relasi = res.find(p => String(p.PesertaId) === String(pesertaId));
            if (relasi) {
              const now = new Date();
              const expired = new Date(relasi.Expired);
              hasil[item.BidangId] = {
                akses: relasi.Aktif === 1 && expired > now,
                expired: expired <= now,
              };
            } else {
              hasil[item.BidangId] = { akses: false, expired: false };
            }
          }
        } catch (err) {
          console.error('Gagal cek akses bidang', err);
        }
      }));

      setAkses(hasil);
      setLoading(false);
    };

    if (data && pesertaId) {
      fetchAksesBidang();
    }
  }, [data, pesertaId]);

  const handleClick = (bidangId) => {
    if (akses[bidangId]?.akses) {
      navigate(`/sub-bidang/${bidangId}`);
    }
  };

  const handleUnlockClick = () => {
    navigate('/hubungi-kami');
  };

  if (loading) return <p>Memuat daftar bidang...</p>;

  return (
    <div className="bidang-grid">
      {data.map((item, index) => {
        const info = akses[item.BidangId] || {};
        const isAktif = info.akses;
        const img = images[index % images.length];

        return (
          <div
            key={item.BidangId}
            className={`bidang-card ${!isAktif ? 'bidang-disabled' : ''}`}
            onClick={() => {
              if (isAktif) handleClick(item.BidangId);
            }}
          >
            <img src={img} alt={item.BidangNama} className="bidang-image" />
<div className="bidang-content">
  <h4 className="bidang-nama">{item.BidangNama}</h4>
  {!isAktif && (
    <div className="bidang-status">
      <div className="status-left">
        <i className="fas fa-lock"></i>
        <span className="status-text">Tidak tersedia</span>
      </div>
      <button
        className="btn btn-sm btn-outline-success unlock-button"
        onClick={(e) => {
          e.stopPropagation();
          handleUnlockClick();
        }}
      >
        <i className="fas fa-unlock"></i> Unlock
      </button>
    </div>
  )}
</div>

          </div>
        );
      })}
    </div>
  );
};

export default DaftarBidang;
