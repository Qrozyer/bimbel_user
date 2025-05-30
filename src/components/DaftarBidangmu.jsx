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

const DaftarBidangmu = ({ data }) => {
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

  if (loading) return <p>Memuat daftar bidangmu...</p>;

  // Filter bidang yang peserta punya akses aktif
  const bidangYangAktif = data.filter(item => akses[item.BidangId]?.akses);

  if (bidangYangAktif.length === 0) {
    return <p>Kamu belum memiliki bidang yang tersedia saat ini.</p>;
  }

  return (
    <div className="bidang-grid">
      {bidangYangAktif.map((item, index) => {
        const img = images[index % images.length];

        return (
          <div
            key={item.BidangId}
            className="bidang-card"
            onClick={() => handleClick(item.BidangId)}
          >
            <img src={img} alt={item.BidangNama} className="bidang-image" />
            <div className="bidang-content">
              <h4 className="bidang-nama">{item.BidangNama}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DaftarBidangmu;
